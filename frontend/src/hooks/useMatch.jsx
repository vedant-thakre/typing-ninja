import { useEffect, useRef, useState } from "react";
import { socket } from "../utils/socket";
import { useSelector } from "react-redux";
import { useTimerContext } from "../context/TimerContext";
import { v4 as uuidv4 } from "uuid";
import { generateUsername } from "unique-username-generator";

const useMatch = (gameMode, gameStarted) => {
  const user = useSelector((state) => state.user.userData);
  const [snippetData, setSnippetData] = useState({ content: [], title: "" });
  const [roomUsers, setRoomUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const roomIdRef = useRef(null);
  const { resetTimer } = useTimerContext();

  const getUserId = () => {
    if (user?._id) {
      return user._id;
    }

    // Check if we already have a guest ID in localStorage
    let guestId = localStorage.getItem("guestId");
    if (!guestId) {
      guestId = `guest_${uuidv4()}`;
      localStorage.setItem("guestId", guestId);
    }
    return guestId;
  };

  const getUsername = () => {
    if (user?.username) {
      return user.username;
    }

    // Try to get guest username from localStorage, or generate one
    const guestUsername = localStorage.getItem("nickName")
      ? localStorage.getItem("nickName")
      : generateUsername("-", 1, 10);
    localStorage.setItem("guestUsername", guestUsername);

    return guestUsername;
  };

  const fetchNewSnippet = (roomId) => {
    const userId = getUserId();
    const username = getUsername();

    if (userId && roomId) {
      setLoading(true);
      socket.emit("requestSnippet", {
        userId,
        username,
        snippetId: snippetData?._id,
        roomId,
      });
    }
  };

  const handleSnippet = (data) => {
    const { users, snippetInfo, roomid } = data;
    console.log("snippetInfo received", users, snippetInfo, roomid);
    const modifiedSnippet = snippetInfo?.content?.replace(/’/g, "'");
    setRoomUsers((prev) => {
      const uniqueUsers = [
        ...prev,
        ...users.filter(
          (newUser) => !prev.some((u) => u.userId === newUser.userId),
        ),
      ];
      return uniqueUsers;
    });
    roomIdRef.current = roomid;
    setSnippetData({
      ...snippetInfo,
      content: modifiedSnippet.split(" "),
      characters: snippetInfo?.content?.length,
      roomId: roomid,
      mode: gameMode,
      startTime: null,
    });
    setLoading(false);
  };

  const handleRoomUpdate = (data) => {
    const { users } = data;
    console.log("roomUpdate received", users);
    setRoomUsers(users);
  };

  useEffect(() => {
    const userId = getUserId();
    const username = getUsername();
    if (userId) {
      socket.connect();
      socket.emit("joinuser", {
        userId,
        username,
        mode: gameMode,
      });

      socket.on("snippet", handleSnippet);
      socket.on("roomUpdate", handleRoomUpdate);

      return () => {
        resetTimer();
        setRoomUsers([]);
        setSnippetData({ content: [], title: "" });
        console.log("socket disconnected");
        socket.emit("leaveRoom", {
          roomId: roomIdRef.current,
          userId,
        });
        // socket.off("snippet", handleSnippet);
      };
    } else {
      console.log("no user found");
    }
  }, [gameMode]);

  return {
    snippetData,
    roomUsers,
    loading,
    fetchNewSnippet,
  };
};

export default useMatch;
