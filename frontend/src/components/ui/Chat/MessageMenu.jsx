import React, { use, useEffect, useRef, useState } from "react";
import { LiaEdit } from "react-icons/lia";
import { RiDeleteBinLine } from "react-icons/ri";
import { TbMessageReply } from "react-icons/tb";
import { PiCopy } from "react-icons/pi";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  reactOnMessage,
  setDeleteMessage,
  setEditMessage,
  setReplyMessage,
} from "../../../store/slices/chatSlice";
import { IoIosAddCircle } from "react-icons/io";

const MessageMenu = ({
  showMessageMenu,
  setShowMessageMenu,
  message,
  userId,
  setOpen,
}) => {
  const menuRef = useRef(null);
  const [emoji, setEmoji] = useState("")
  const selectedChat = useSelector((state) => state.chat.chat);
  const dispatch = useDispatch();

  const handleEdit = () => {
    dispatch(setEditMessage(message));
  };
  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    toast.success("Message copied to clipboard");
  };
  const handleDelete = () => {
    dispatch(setDeleteMessage(message));
    setOpen(true);
  };
  const handleReply = () => {
    dispatch(setReplyMessage(message));
  };2

  const handleReaction  = () => {
    dispatch(reactOnMessage({
      messageId: message?._id,
      id: selectedChat?.friend?._id,
      emoji: emoji
    }));
  };

  console.log("emoji", emoji, selectedChat);

  const menuItems = [
    {
      icon: <LiaEdit className="text-white text-lg" />,
      label: "Edit",
      visibleFor: "user",
      onClick: handleEdit,
      show:
        new Date(message?.updatedAt) >
        new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
    },
    {
      icon: <TbMessageReply className="text-white text-[18px]" />,
      label: "Reply",
      visibleFor: "both",
      onClick: handleReply,
      show: true,
    },
    {
      icon: <PiCopy className="text-white text-lg" />,
      label: "Copy",
      visibleFor: "both",
      onClick: handleCopy,
      show: true,
    },
    {
      icon: <RiDeleteBinLine className="text-danger text-[17px]" />,
      label: "Delete",
      visibleFor: "user",
      onClick: handleDelete,
      show: true,
    },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMessageMenu(null);
      }
    };

    const handleScroll = () => {
      setShowMessageMenu(null);
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll, true); // `true` captures scrolls in nested elements too

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, [showMessageMenu]);


  const reactions = [
    { emoji: "👍", count: 5 },
    { emoji: "❤️", count: 3 },
    { emoji: "😂", count: 2 },
    { emoji: "😢", count: 1 },
    { emoji: "😡", count: 0 },

  ];

  return (
    <div
      className={`w-full absolute z-20 ${
        message.sender === userId ? "left-0" : "right-0"
      } top-0 flex justify-center`}
      ref={menuRef}
    >
      <div className="absolute top-[-50px] bg-secondary shadow-light px-3 rounded-full right-[-10px] flex ">
        {reactions.map((reaction, index) => (
          <motion.div
            whileHover={{ scale: 1.25 }}
            key={index}
            onClick={() => {
               dispatch(
                 reactOnMessage({
                   messageId: message?._id,
                   id: selectedChat?.friend?._id,
                   emoji: reaction?.emoji,
                 })
               );
            }}
            className="flex items-center justify-center px-[5px] h-11 cursor-pointer text-white text-xl rounded-full"
          >
            {reaction?.emoji}
          </motion.div>
        ))}
        <motion.div
          whileHover={{ scale: 1.25 }}
          onClick={() => {
            // setEmoji(emoji);
            // localStorage.setItem("emoji", emoji);
          }}
          className="flex items-center justify-center px-[5px] h-11 cursor-pointer text-white text-2xl rounded-full"
        >
          <IoIosAddCircle className="text-[#1d1d1d]" />
        </motion.div>
      </div>
      <div className="bg-secondary px-2 py-1 rounded-lg shadow-hard flex flex-col gap-1">
        {menuItems.map((item, index) => (
          <>
            {((message.sender === userId && item?.show) ||
              (item.visibleFor === "both" && message.sender !== userId)) && (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.stopPropagation();
                  setShowMessageMenu(null);
                  item.onClick();
                }}
                key={index}
                className="flex items-center hover:bg-dark pl-1 pr-3 py-1 rounded-md gap-2 text-white cursor-pointer"
              >
                {item.icon}
                <span className="text-sm">{item.label}</span>
              </motion.div>
            )}
          </>
        ))}
      </div>
    </div>
  );
};

export default MessageMenu;
