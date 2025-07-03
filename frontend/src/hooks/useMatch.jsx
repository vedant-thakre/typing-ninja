import { useEffect, useRef, useState } from "react";
import { socket } from "../utils/socket";
import { useSelector } from "react-redux";
import { useTimerContext } from "../context/TimerContext";

const useMatch = (gameMode, gameStarted) => {
  const user = useSelector((state) => state.user.userData);
  const [snippetData, setSnippetData] = useState({ content: [], title: "" });
  const [roomUsers, setRoomUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const roomIdRef = useRef(null);
  const { resetTimer } = useTimerContext();


  const fetchNewSnippet = (roomId) => {
    if (user?._id && roomId) {
      setLoading(true);
      socket.emit("requestSnippet", {
        userId: user?._id,
        username: user?.username,
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
          (newUser) => !prev.some((u) => u.userId === newUser.userId)
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
    if (user && user?._id) {
      socket.connect();
      socket.emit("joinuser", {
        userId: user?._id,
        username: localStorage.getItem("username")
          ? localStorage.getItem("username")
          : user?.username,
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
          userId: user?._id,
        });
        // socket.off("snippet", handleSnippet);
      };
    }
  }, [user]);

  return {
    snippetData,
    roomUsers,
    loading,
    fetchNewSnippet,
  };
};

export default useMatch;
