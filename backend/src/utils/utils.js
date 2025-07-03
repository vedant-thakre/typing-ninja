import { Snippet } from "../models/snippet.model.js";
import { v4 as uuidv4 } from "uuid";
import {
  uniqueNamesGenerator,
  animals,
  names,
  adjectives,
} from "unique-names-generator";
import colors from "colors";

// create match in db for solo matches for now
// add the highscore in the snippet scores
// try to implement duel match if possible
// create the ui for custom matches.


const generateUsername = () => {
  const customNumbers = () => Math.floor(Math.random() * 100);
  const baseUsername = uniqueNamesGenerator({
    dictionaries: [adjectives, animals, names],
    separator: "",
    length: 2,
  });

  const shouldAddNumber = Math.random() < 0.5;
  return shouldAddNumber ? `${baseUsername}${customNumbers()}` : baseUsername;
};

export const getRandomSnippet = async (snippetId) => {
  const matchStage = snippetId
    ? [{ $match: { status: "approved", _id: { $ne: snippetId } } }]
    : [{ $match: { status: "approved" } }];

  const [randomSnippet] = await Snippet.aggregate([
    ...matchStage,
    { $sample: { size: 1 } },
  ]);

  return randomSnippet || null;
};

export const findOrCreateDuelRoom = (rooms) => {
  const waitingRoomId = Object.keys(rooms).find((id) => {
    const room = rooms[id];
    return room.mode === "duel" && room.users.length === 1 && !room.started;
  });
  let roomId;

  if (waitingRoomId) {
    roomId = waitingRoomId;
  } else {
    // Create a new room with a unique ID
    const id = uuidv4();
    roomId = `duel-${id}`;
    rooms[roomId] = { users: [], mode: "duel", started: false };
  }

  return roomId;
};

export const getBotUser = (socketId) => {
  const userId = `bot-${uuidv4()}`;
  const username = generateUsername();
  return {
    userId,
    username,
    socketId: socketId,
    progress: 0,
    wpm: "",
    accuracy: "",
    errorCount: "",
    time: "",
  };
}

export const soloMatch = async (userId, username, socket, rooms, snippetId) => {
  try {
    const id = uuidv4();
    const roomId = `solo-${id}`;
    rooms[roomId] = { users: [], mode: "solo", started: false };
    console.log(`User connected: ${userId}`.cyan.bold);
    const room = rooms[roomId];

    if (room.started) {
      return socket.emit("error", "Match already started");
    }

    if (!room.users.some((u) => u.userId === userId)) {
      room.users.push({
        userId,
        username,
        socketId: socket.id,
        progress: 0,
        wpm: "",
        accuracy: "",
        errorCount: "",
        time: "",
      });
      socket.join(roomId);
    }

    const snippet = await getRandomSnippet(snippetId);

    if (!snippet) {
      console.error("No snippets found.");
      return;
    }
    socket.emit("snippet", {
      snippetInfo: snippet,
      users: [{ userId, username }],
      error: snippet ? null : "Error in Connecting",
      roomid: roomId,
    });

    // if (mode === "solo" && userCount === 1) {
    //   console.log("starting match");
    //   setTimeout(() => {
    //     startMatch(roomId, rooms, io);
    //   }, 1500);
    // }
  } catch (error) {
    console.error("Error fetching random snippet:", error);
  }
}

export const startMatch = (roomId, rooms, io) => {
  const room = rooms[roomId];
  const now = Date.now();

  // If lobby hasn't started, start it
  if (!room.lobbyStartTime) {
    room.lobbyStartTime = now;
    room.matchStartTime = now + 1500; // match begins 1.5s later
  }

  // Run emit loop every 500ms
  room.intervalId = setInterval(() => {
    const elapsed = Date.now() - room.matchStartTime;
    console.log("elapsed", elapsed);
    io.in(roomId).emit("ROOM_TIMER", {
      elapsedTime: elapsed,
      phase:
        elapsed < 0
          ? "waiting"
          : elapsed < 10000
          ? "lobby"
          : elapsed < 310000
          ? "game"
          : "ended",
    });
    

    if (elapsed >= 300000) {
      clearInterval(room.intervalId);
      delete room.intervalId;
    }
  }, 500);
};

export const simulateBotTyping = (bot, room, io) => {
  const duration = getBotFinishTime(room.snippet.difficulty);
  const startTime = Date.now();
  const interval = 1000;

  const updateProgress = () => {
    const elapsed = Date.now() - startTime;
    if (elapsed >= duration) {
      bot.progress = 100;

      // Send dummy stats
      // bot.wpm = randomBetween(45, 80);
      // bot.accuracy = randomBetween(90, 98);
      // bot.errorCount = randomBetween(1, 5);
      // bot.time = duration;

      io.in(room.roomId).emit("botUpdate", {
        userId: bot.userId,
        progress: 100,
      });
      clearInterval(bot.intervalId);
      return;
    }

    // Non-linear progress
    const t = elapsed / duration;
    const nonLinearProgress = Math.floor(Math.pow(t, 0.75) * 100); // slows down near end
    bot.progress = Math.min(nonLinearProgress, 100);

    io.in(room.roomId).emit("botUpdate", {
      userId: bot.userId,
      progress: bot.progress,
    });
  };

  bot.intervalId = setInterval(updateProgress, interval);
};


export const duelMatch = async (
  userId,
  username,
  socket,
  roomId,
  rooms,
  io,
  mode
) => {
  try {
    if (!rooms[roomId]) {
      rooms[roomId] = { users: [], mode, started: false };
    }

    const room = rooms[roomId];

    if (room.started) {
      return socket.emit("error", "Match already started");
    }
    
    if (!room.users.some((u) => u.userId === userId)) {
      room.users.push({ userId, username, socketId: socket.id, progress: 0, wpm: "", accuracy: "", errorCount: "", time: "" });
      socket.join(roomId);
    }
      
    // Send room user list
    // io.in(roomId).emit("roomUpdate", {
    //   users: room.users.map((u) => u.username),
    //   mode: room.mode,
    // });

    const userCount = room.users.length;

    // If first user joins
    if (userCount === 1) {
      const snippet = await getRandomSnippet();
      room.snippet = snippet;
      room.createdAt = Date.now();

      // Send only to the first user
      socket.emit("snippet", {
        snippetInfo: snippet,
        users: room.users,
        roomid: roomId,
      });

      setTimeout(() => {
        if (room.users.length === 1 && !room.started) {
          const bot = getBotUser(`socket-id-${uuidv4()}`);
          room.users.push(bot);
          // simulateBotTyping(bot, room, io); // see step 4
          io.in(roomId).emit("snippet", {
            snippetInfo: room.snippet,
            users: room.users,
            roomid: roomId,
          });
          // setTimeout(() => {
          //   startMatch(roomId, rooms, io);
          // }, 1500);
        }
      }, 30000);
    }

    // If second user joins
    if (mode === "duel" && userCount === 2) {
      console.log("starting match");
      io.in(roomId).emit("snippet", {
        snippetInfo: room.snippet,
        users: room.users,
        roomid: roomId,
      });
      setTimeout(() => {
        startMatch(roomId, rooms, io);
      }, 1500);
    }
  } catch (error) {
    console.error("Error in duel match:", error);
  }
};

export const multiplayerMatch = async (userId, username, socket, roomId, rooms, io, mode) => {
  try {
    if (!rooms[roomId]) {
      rooms[roomId] = { users: [], mode, started: false };
    }
    const room = rooms[roomId];
    if (room.started) {
      return socket.emit("error", "Match already started");
    }

    room.users.push({ userId, username, socketId: socket.id });
    socket.join(roomId);

    io.in(roomId).emit("roomUpdate", {
      users: room.users.map((u) => u.username),
      mode: room.mode,
    });

    // Start logic for duel/multiplayer
    const userCount = room.users.length;

    if (mode === "duel" && userCount === 2) {
      startMatch(roomId);
    } else if (mode === "multiplayer" && userCount >= 3) {
      if (!room.startTimeout) {
        room.startTimeout = setTimeout(() => {
          startMatch(roomId);
        }, 10000); // 10s for multiplayer
      }
    }
  } catch (error) {
    console.error("Error in duel match:", error);
  }
};

/*
medium 
errorCount: 14, wpm - 68.50, time - 48.53
errorCount: 8, wpm - 71.76, time - 51.51
errorCount: 10, wpm - 74.09, time - 46.50
errorCount: 9, wpm - 84.29, time - 42.51
errorCount: 17, wpm - 70.75, time - 48.91


hard 
errorCount: 20, wpm - 70.49, time - 1:10.20
errorCount: 29, wpm - 70.80, time - 1:16.61
errorCount: 26, wpm - 68.17, time - 1:12.31
errorCount: 16, wpm - 75.51, time - 1.05.81
errorCount: 17, wpm - 74.82, time - 1.08.61



*/

