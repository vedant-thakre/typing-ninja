import express from "express";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import colors from "colors";
import {
  duelMatch,
  findOrCreateDuelRoom,
  getRandomSnippet,
  multiplayerMatch,
  soloMatch,
  startMatch,
} from "../utils/utils.js";
import { createMatch } from "../controllers/match.controller.js";

dotenv.config();

export const app = express();
export const server = http.createServer(app);

export const io = new Server(server, {
  cors: {
    origin: [process.env.CORS_ORIGIN || "*"],
  },
});

const users = {};
const rooms = {};



io.on("connection", (socket) => {
  socket.on("joinuser", async ({ userId, username, mode }) => {
    console.log("total rooms", Object.keys(rooms).length);
    if (mode === "solo") {
      await soloMatch(userId, username, socket, rooms, null);
      return;
    } else if (mode === "duel") {
      const roomId = findOrCreateDuelRoom(rooms);
      console.log(`Room ID for user ${username}: ${roomId}`);
      await duelMatch(userId, username, socket, roomId, rooms, io, mode);
      // socket.emit("roomJoined", { roomId });
      return;
    } else if (mode === "multiplayer") {
      await multiplayerMatch(userId, username, socket, rooms, io, mode);
      return;
    }
  });

  console.log("rooms", rooms);

  socket.on("matchComplete", async ({matchData, roomId}) => {
    console.log("matchComplete", matchData);
    const room = rooms[roomId];
    io.in(roomId).emit("MATCH_COMPLETE");
    if (room.intervalId) {
      clearInterval(room.intervalId);
      delete room.intervalId;
    }
    delete room.lobbyStartTime;
    delete room.matchStartTime;
    await createMatch(matchData);
  });

  socket.on("startSoloMatch", ({ roomId }) => {
    const room = rooms[roomId];
    if (!room || room.started) return;

    console.log(`Starting solo match for room ${roomId}`);
    startMatch(roomId, rooms, io);
  });
  

  socket.on("requestSnippet", async ({ userId, username, snippetId, roomId }) => {
    delete rooms[roomId];
    await soloMatch(userId, username, socket, rooms, snippetId);
  });

  // Track user progress (without setName) IGNORE THIS NOT IMPORTANT
  socket.on("playerProgress", ({ userId, progress, roomId }) => {
    if (!roomId || !rooms[roomId]) {
      console.log(`Room ${roomId} not found for socket ${socket.id}`);
      return;
    }
    console.log("Progress:", progress);
    const room = rooms[roomId];
    console.log(`User ${userId} progress: ${progress} in room: ${roomId}`);

    // Update user progress in the room
    const user = room.users.find((u) => u.userId === userId);
    if (user) {
      user.progress = progress;
      // Notify others in the room about the updated progress
      socket.to(roomId).emit("roomUpdate", { users: room.users });
    } else {
      console.log(`User ${userId} not found in room ${roomId}`);
    }
  });

  // leave the room
  socket.on("leaveRoom", ({ roomId, userId }) => {
    if (!roomId || !rooms[roomId]) {
      console.log(`Room ${roomId} not found for socket ${socket.id}`);
      return;
    }
    const room = rooms[roomId];
    console.log(`User ${socket.id} leaving room: ${roomId}`);
    socket.emit("ROOM_TIMER_RESET");
    socket.leave(roomId);

    // Remove user
    room.users = room.users.filter((u) => u.userId !== userId);

    // Notify others that the user left
    io.in(roomId).emit("ROOM_TIMER_RESET");
    socket.to(roomId).emit("roomUpdate", { users: room.users });

    if (room.intervalId) {
      clearInterval(room.intervalId);
      delete room.intervalId;
    }

    delete room.lobbyStartTime;
    delete room.matchStartTime;
  
    // If no users left, you can optionally delete the room
    if (room.users.length === 0 || (room.users.length === 1 && room?.users[0]?.userId?.slice(0, 3) === "bot")) {
      delete rooms[roomId];
      console.log(`Deleted empty room: ${roomId}`.bgRed.bold);
    }
  });

  // Track user progress (without setName) IGNORE THIS NOT IMPORTANT
  socket.on("progress", ({ userName, progress }) => {
    if (!users[userName]) {
      users[userName] = { name: userName, progress: 0 }; // Store user if not already added
    }

    users[userName].progress = progress; // Update progress

    io.emit("updateProgress", formatProgressData());
  });

  // Handle incoming chat messages
  socket.on("chatMessage", ({ chatId, message }) => {
    io.to(chatId).emit("newMessage", { chatId, message });
  });

  // Join a chat room
  socket.on("joinChat", (chatId) => {
    socket.join(chatId);
    console.log(`User ${socket.id} joined chat room: ${chatId}`);
  });

  socket.on("world-chat", async ({ userId, username }) => {
    socket.join("world-chat");
    console.log(`${username} has joined worldchat chat: ${userId}`);

    const worldChatRoom = await io.in("world-chat").fetchSockets();
    const userCount = worldChatRoom.length;

    console.log("worldChatUserCount", userCount);

    // 🔥 Broadcast to all in the room, not just the newly joined socket
    io.in("world-chat").emit("worldChatUserCount", userCount);
  });

  // Leave a chat room
  socket.on("leaveChat", (chatId) => {
    socket.leave(chatId);
    console.log(`User ${socket.id} left chat room: ${chatId}`);

    if (chatId === "world-chat") {
      // After a user leaves the world-chat room, update user count
      io.in("world-chat")
        .fetchSockets()
        .then((worldChatRoom) => {
          const userCount = worldChatRoom.length;
          console.log("worldChatUserCount", userCount);
          io.in("world-chat").emit("worldChatUserCount", userCount);
        });
    }
  });

  // Handle disconnection
  socket.on("disconnect", async () => {
    Object.keys(users).forEach((key) => {
      if (users[key].name === socket.id) {
        delete users[key];
      }
    });

    io.emit("updateProgress", formatProgressData());

    // After disconnection, update the user count in the world-chat room I DONT THINK I NEED THIS HENCE LEAVING COMMENTED
    // const worldChatRoom = await io.in("world-chat").fetchSockets();
    // const userCount = worldChatRoom.length;

    // console.log("worldChatUserCount", userCount);
    // io.in("world-chat").emit("worldChatUserCount", userCount);

    console.log(`User disconnected: ${socket.id}`.red.bold);
  });

  // Helper function to format progress data
  function formatProgressData() {
    return Object.values(users).reduce((acc, { name, progress }) => {
      acc[name] = progress;
      return acc;
    }, {});
  }
});
