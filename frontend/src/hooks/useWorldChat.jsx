import { useState } from "react";
import { socket } from "../utils/socket";
import { useDispatch, useSelector } from "react-redux";
import { setWorldChat } from "../store/slices/chatSlice";

const useWorldChat = () => {
  const dispatch = useDispatch();
  const worldChat = useSelector((state) => state.chat.worldChat);
  const user = useSelector((state) => state.user.userData);
  const [activeUserCount, setActiveUserCount] = useState(0);

  const subscribeToWorldChatMessages = () => {
    socket.connect();

    socket.emit("world-chat", {
      chatId: "world-chat",
      userId: user?._id,
      username: user?.username,
    });

    // Avoid duplicate listeners
    socket.off("worldChatUserCount");
    socket.off("worldChatMessage");

    socket.on("worldChatUserCount", (count) => {
      setActiveUserCount(count);
    });

    socket.on("worldChatMessage", (newMessage) => {
      if(user?._id !== newMessage?.sender?._id){
        console.log("socket", user?._id, newMessage?.sender?._id);
        const updatedMessages = [...worldChat?.messages, newMessage];
        dispatch(setWorldChat({ ...worldChat, messages: updatedMessages }));
      }
    });
  };

  const unsubscribeFromWorldChatMessages = () => {
    socket.emit("leaveChat", "world-chat");
    socket.off("worldChatMessage");
    socket.off("worldChatUserCount");
  };

  return {
    subscribeToWorldChatMessages,
    unsubscribeFromWorldChatMessages,
    activeUserCount,
  };
};

export default useWorldChat;
