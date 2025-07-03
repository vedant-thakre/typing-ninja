import React, { useEffect, useRef, useState, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getChat } from "../../../store/slices/chatSlice";
import ChatInput from "./ChatInput";
import Message from "./Message";

const ChatBox = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const chat = useSelector((state) => state.chat.chat);
  const [showMessageMenu, setShowMessageMenu] = useState(null);
  const chatUser = chat && chat.friend;
  const messagesEndRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const isFirstLoadRef = useRef(true);
  const previousMessageCountRef = useRef(0);

  const isUserAtBottom = () => {
    const container = scrollContainerRef.current;
    if (!container) return false;
    const threshold = 150;
    const position =
      container.scrollHeight - container.scrollTop - container.clientHeight;
    return position <= threshold;
  };

  useEffect(() => {
    if (id) {
      isFirstLoadRef.current = true;
      dispatch(getChat({ id: id }));
    }
  }, [id]);

  console.log("chat", chat);

  useEffect(() => {
    const container = scrollContainerRef.current;
    const currentMessageCount = chat?.messages?.length || 0;

    setTimeout(() => {
      if (!container) return;

      if (isFirstLoadRef.current) {
        isFirstLoadRef.current = false;
        container.scrollTo({
          top: container.scrollHeight,
          behavior: "smooth",
        });
      } else if (
        currentMessageCount > previousMessageCountRef.current &&
        isUserAtBottom()
      ) {
        container.scrollTo({
          top: container.scrollHeight,
          behavior: "smooth",
        });
      }

      previousMessageCountRef.current = currentMessageCount;
    }, 100);
  }, [chat?.messages]);

  return (
    <div className="w-[800px] flex flex-col h-full gap-5 justify-center">
      <div className="bg-bgprimary w-full relative h-full pb-3 flex flex-col items-center gap-3 rounded-2xl shadow-hard">
        <div className="w-full">
          <h5 className="text-white tracking-wider px-5 bg-primary py-2 rounded-t-2xl rounded-b-md font-route text-[24px] font-bold">
            {chat?.isGroupchat
              ? chat?.chatName
              : chatUser
              ? chatUser.username
              : "Chat"}
          </h5>
        </div>
        <div
          ref={scrollContainerRef}
          className="px-4 flex flex-col pt-2 gap-2 scrollbar-none overflow-y-scroll h-[452px] w-full"
        >
          {chat?.messages &&
            chat?.messages?.length > 0 &&
            chat?.messages?.map((message) => {
              return (
                <Message
                  key={message?._id}
                  isWorldChatMessage={false}
                  message={message}
                  showMessageMenu={showMessageMenu}
                  setShowMessageMenu={setShowMessageMenu}
                />
              );
            })}
          <div className="mt-[-40px] p-0 " ref={messagesEndRef} />
        </div>
        <ChatInput isWorldChat={false} />
      </div>
    </div>
  );
};

export default ChatBox;
