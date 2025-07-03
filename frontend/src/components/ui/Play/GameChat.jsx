import React from 'react'

const GameChat = () => {
  return (
    <div className="bg-bgsecondary flex-col items-center gap-3 rounded-2xl shadow-hard">
      <div className="w-full">
        <h5 className="text-white tracking-wider px-5 bg-primary py-2 rounded-t-2xl rounded-b-md font-route text-[24px] font-bold">
          Chat
        </h5>
      </div>
      {/* Profile */}
      <div className="flex flex-col gap-4 p-4">
        <div className="f py-4 px-5 border-2 border-bprimary rounded-2xl">
          <div className="flex h-[270px] items-center flex-col gap-6"></div>
        </div>
        <input
          placeholder="Write a message..."
          type="text"
          className="outline-none px-4 text-[22px] text-textcolor  font-route placeholder:text-[20px]  placeholder:text-bprimary bg-transparent border-2 border-bprimary rounded-2xl py-[4px] w-full"
        />
      </div>
    </div>
  );
}

export default GameChat
