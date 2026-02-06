import React, { useEffect, useRef, useState } from "react";
import ChatInput from "../Chat/ChatInput";
import { useDispatch, useSelector } from "react-redux";
import { getWorldChat } from "../../../store/slices/chatSlice";
import WorldChatMessage from "../Chat/WorldChatMessage";
import ChatSkeleton from "../../skeletons/ChatSkeleton";
import useWorldChat from "../../../hooks/useWorldChat";
import LoginWarningBanner from "../Other/LoginWarningBanner";
const WorldChat = () => {
  const dispatch = useDispatch();
  const chat = useSelector((state) => state.chat.worldChat);
  const {
    subscribeToWorldChatMessages,
    unsubscribeFromWorldChatMessages,
    activeUserCount,
  } = useWorldChat();
  const [showMessageMenu, setShowMessageMenu] = useState(null);
  const apiLoading = useSelector((state) => state.chat.loading);
  const user = useSelector((state) => state.user.userData);
  const chatUser = null;
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
    dispatch(getWorldChat());
    subscribeToWorldChatMessages();

    return () => {
      unsubscribeFromWorldChatMessages();
    };
  }, []);

  useEffect(() => {
    if (!apiLoading) {
      const container = scrollContainerRef.current;
      const currentMessageCount = chat?.messages?.length || 0;

      requestAnimationFrame(() => {
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
        }, 0); // ensures messages are painted
      });
    }
  }, [chat?.messages]);

  return (
    <div className="w-[800px] flex flex-col h-[38rem] gap-5 justify-center">
      <div className="bg-bgprimary w-full relative h-full pb-3 flex flex-col items-center gap-3 rounded-2xl shadow-hard">
        <div className="w-full">
          <h5 className="text-white flex items-center justify-between tracking-wider px-5 bg-primary py-2 rounded-t-2xl rounded-b-md font-route text-[24px] font-bold">
            <span className="text-title">{`Chat`}</span>
            {user && (
              <span className="text-title2 text-[#96f471]">{`${activeUserCount} Online`}</span>
            )}
          </h5>
        </div>
        <div
          ref={scrollContainerRef}
          className="px-4 flex flex-col pt-2 gap-2 scrollbar-none overflow-y-scroll h-[480px] w-full"
        >
          {/* {apiLoading ? (
            <ChatSkeleton />
          ) : ( */}
          <>
            {chat?.messages?.map((message, index) => {
              return (
                <WorldChatMessage
                  key={index}
                  message={message}
                  showMessageMenu={showMessageMenu}
                  setShowMessageMenu={setShowMessageMenu}
                />
              );
            })}
            <div className="mt-[-40px] p-0 " ref={messagesEndRef} />
          </>
          {/* )} */}
        </div>
        {user && <ChatInput chatUser={chatUser} />}
        {!user && (
          <div className="w-full px-3">
            <LoginWarningBanner warning="Log in to join the world chat." />
          </div>
        )}
      </div>
    </div>
  );
};

export default WorldChat;
