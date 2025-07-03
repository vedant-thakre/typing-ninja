import React, { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import AnimatedButton from "../Other/AnimatedButton";
import { IoSend, IoCloseCircle } from "react-icons/io5";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import EmojiPicker from "emoji-picker-react";
import { useDispatch, useSelector } from "react-redux";
import {
  sendMessage,
  editMessage,
  setEditMessage,
  setReplyMessage,
  replyToMessage,
} from "../../../store/slices/chatSlice";

const ChatInput = ({ isWorldChat }) => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const user = useSelector((state) => state.user.userData);
  const theme = useSelector((state) => state.user.theme);
  const selectedChat = useSelector((state) => state.chat.chat);
  const editMsg = useSelector((state) => state.chat.editMessage);
  const replyMsg = useSelector((state) => state.chat.replyMessage);

  useEffect(() => {
    if (editMsg) {
      setMessage(editMsg.content);
    }
  }, [editMsg]);

  const resetInput = () => {
    setMessage("");
    setShowEmojiPicker(false);
    dispatch(setEditMessage(null));
    dispatch(setReplyMessage(null));
  };

  const handleSendMessage = useCallback(
    async (e) => {
      e.preventDefault();
      const trimmedMsg = message.trim();
      if (!trimmedMsg) return;

      const payload = {
        id: selectedChat?.friend?._id,
        content: trimmedMsg,
      };

      let response;
      if (isWorldChat) {
        response = await dispatch(
          sendMessage({
            id: null,
            message: trimmedMsg,
            isFirstMessage: false,
            isWorldChat,
          })
        );
      } else {
        if (editMsg) {
          response = await dispatch(
            editMessage({
              ...payload,
              messageId: editMsg._id,
              isFirstMessage: false,
            })
          );
        } else if (replyMsg) {
          response = await dispatch(
            replyToMessage({
              ...payload,
              chatId: selectedChat?._id,
              messageId: replyMsg._id,
            })
          );
        } else {
          response = await dispatch(
            sendMessage({
              chatId: selectedChat?._id,
              id: selectedChat?.friend?._id,
              message: trimmedMsg,
              isFirstMessage: !selectedChat?._id,
            })
          );
        }
      }
      if (response?.payload?.status === 200) {
        resetInput();
      }
    },
    [message, editMsg, replyMsg, selectedChat, dispatch]
  );

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSendMessage(e);
  };

  return (
    <div className="w-full absolute bottom-3 z-10">
      {replyMsg && (
        <div className="bg-bgsecondary mx-2 relative flex border-2 border-b-0 border-bprimary items-center gap-2 px-4 py-2 rounded-t-xl">
          <IoCloseCircle
            className="text-textsecond hover:text-white absolute top-[-12px] right-[-13px] cursor-pointer w-[28px] h-[20px] rounded-full"
            onClick={() => dispatch(setReplyMessage(null))}
          />
          <p className="font-route w-full mt-1 pl-2 flex flex-col pb-1 border-l-[3px] bg-[#5a5a5a] text-white rounded-r-lg rounded-l-md text-[18px]">
            <span className="text-[20px] mb-[-13px]">
              {!selectedChat?.isGroupChat
                ? replyMsg?.sender === user?._id
                  ? user?.username
                  : selectedChat?.friend?.username
                : ""}
            </span>
            <span className="leading-4 mt-2">
              {replyMsg.content?.length > 100
                ? replyMsg.content.slice(0, 100) + "..."
                : replyMsg.content}
            </span>
          </p>
        </div>
      )}

      <div className="flex gap-3 relative w-full items-center px-3">
        <motion.div
          whileHover={{ y: -2, transition: { duration: 0.3, ease: "easeOut" } }}
          whileTap={{ scale: 0.98 }}
        >
          <MdOutlineEmojiEmotions
            className="text-textsecond cursor-pointer w-[41px] p-[4px] h-[40px] rounded-full bg-bgsecondary mr-[-5px]"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          />
        </motion.div>

        {showEmojiPicker && (
          <div className="absolute bottom-12 left-4">
            <EmojiPicker
              onEmojiClick={(emoji) => setMessage((prev) => prev + emoji.emoji)}
              width={280}
              height={250}
              theme={theme === "dark" ? "dark" : "light"}
              previewConfig={{ showPreview: false }}
              lazyLoadEmojis
              emojiStyle="apple"
              searchDisabled
              skinTonesDisabled
              groupNames={{
                smileys_people: "Smileys & People",
                animals_nature: "Animals & Nature",
                food_drink: "Food & Drink",
                travel_places: "Travel & Places",
                activities: "Activities",
                objects: "Objects",
                symbols: "Symbols",
                flags: "Flags",
              }}
              native={false}
              disableAutoFocus
              disableCategoryButtons
              disableRecent
              disableCategoryIcons
              disableCategoryNames
              disableSkinTonePicker
              disableScroll
              disableSearchBar
            />
          </div>
        )}

        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          type="text"
          placeholder="Type a message..."
          className="border-bprimary w-full font-main text-sm rounded-full placeholder-textsecond outline-none focus:ring-0 py-2 px-4 bg-bgsecondary text-white h-[42px]"
        />

        <AnimatedButton
          icon={<IoSend />}
          onClick={handleSendMessage}
          className="px-3 py-[10px] text-[18px] text-white h-full font-route border-bdshadow rounded-2xl border-2"
        />
      </div>
    </div>
  );
};

export default ChatInput;
