import React from "react";

const ChatSkeleton = () => {
  const messages = Array.from({ length: 24 });

  return (
    <div className="px-1 py-2 space-y-3">
      {messages.map((_, index) => {
        const randomWidth = `${Math.floor(Math.random() * 30) + 40}%`; // 40% to 80%
        const randomHeight = `${Math.floor(Math.random() * 8) + 30}px`; // 20px to 40px
        const alignment = Math.random() > 0.5 ? "justify-start" : "justify-end";

        return (
          <div key={index} className={`flex ${alignment} w-full`}>
            <div
              className="bg-bgthird rounded-xl animate-pulse"
              style={{ width: randomWidth, height: randomHeight }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default ChatSkeleton;
