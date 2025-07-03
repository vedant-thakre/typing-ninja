import React, { useState } from 'react'
import ChatsList from '../components/ui/Chat/ChatsList';
import ChatBox from '../components/ui/Chat/ChatBox';

const Chats = () => {
  return (
    <div className="lg:h-[78vh] flex mt-[60px] justify-center gap-5">
      <ChatsList />
      <ChatBox/>
    </div>
  );
}

export default Chats
