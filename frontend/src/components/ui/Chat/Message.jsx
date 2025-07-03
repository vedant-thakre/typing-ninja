import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { countEmojis } from "../../../utils/helper";
import MessageMenu from "./messageMenu";
import Modal from "../Other/Modal";
import { deleteMessage } from "../../../store/slices/chatSlice";

const Message = ({
  message,
  showMessageMenu,
  setShowMessageMenu,
}) => {
  const dispatch = useDispatch();
  const { _id: userId } = useSelector((state) => state.user.userData);
  const [open, setOpen] = useState(false);
  const selectedChat = useSelector((state) => state.chat.chat);

  const handleDelete = async () => {
    try {
      const response = await dispatch(
        deleteMessage({
          messageId: message._id,
          id: selectedChat?.friend?._id,
          chatId: selectedChat?._id,
        })
      );
      if (response?.payload?.status === 200) {
        setOpen(false);
        // toast.success("Message deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting message:", error);
      setOpen(false);
    }
  };

  const time = new Date(
    message?.isDeleted ? message?.createdAt : message?.updatedAt
  ).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const isOwnMessage = message.sender === userId;
  const isEmojiOnly =
    message?.content?.length > 0 && countEmojis(message?.content) === 1;
  const isLongMessage = message?.content?.length > 50;

  return (
    <div
      className={`flex cursor-pointer ${
        isOwnMessage ? "justify-end" : "justify-start"
      } gap-2 items-center ${message?.reactions?.length > 0 && "mb-2"}`}
    >
      <div
        className={`flex ${
          isOwnMessage ? "flex-row-reverse" : "flex-row"
        } items-center gap-2`}
      >
        <div
          onClick={() => setShowMessageMenu(message._id)}
          className={`group flex flex-col cursor-pointer relative pr-2 max-w-[500px] pt-1 pb-[2px] pl-2 rounded-xl ${
            isOwnMessage ? "items-end bg-dark" : "items-start bg-primary"
          }`}
        >
          {showMessageMenu === message._id && !message.isDeleted && (
            <MessageMenu
              showMessageMenu={showMessageMenu}
              setShowMessageMenu={setShowMessageMenu}
              message={message}
              userId={userId}
              setOpen={setOpen}
            />
          )}

          {message?.replyTo && (
            <p
              className={`font-route w-full mt-1 mb-1 pl-2 leading-4 py-[6px] border-l-[3px] rounded-r-lg rounded-l-md ${
                isOwnMessage ? "bg-[#5a5a5a]" : "bg-[#8fa6f9]"
              } ${
                message.isDeleted ? "italic text-bprimary" : "text-white"
              } text-[18px]`}
            >
              {message.replyTo.content}
            </p>
          )}

          <div
            className={`flex w-full ${
              isLongMessage ? "flex-col" : "flex-row justify-between"
            } items-center`}
          >
            <p
              className={`font-route ${
                isLongMessage ? "w-full" : "mb-[-4px]"
              } ${
                message.isDeleted
                  ? isOwnMessage
                    ? "italic text-bprimary"
                    : "italic text-[#c5c5c5]"
                  : "text-white"
              } text-[20px] ${
                isEmojiOnly
                  ? "mb-[-15px] text-[45px]"
                  : "leading-[18px] pb-2 pt-1"
              }`}
            >
              {message.content}
            </p>

            <p
              className={`font-route ml-4 tracking-wide text-white text-[15px] ${
                isLongMessage
                  ? "w-full text-end mt-[-13px] mr-3 mb-[-2px]"
                  : "mb-[-13px]"
              } ${isEmojiOnly ? "mb-[-40px]" : ""}`}
            >
              {message.isEdited && (
                <span
                  className={
                    isOwnMessage ? "text-textsecond mr-2" : "text-white"
                  }
                >
                  edited{" "}
                </span>
              )}
              {time}
            </p>
          </div>

          {message?.reactions?.length > 0 && (
            <div
              onClick={(e) => e.stopPropagation()}
              className="flex gap-[-10px] absolute left-[-5px]  bottom-[-14px] items-center"
            >
              {message?.reactions?.map((reaction, index) => (
                <div
                  key={index}
                  className={`bg-dark py-[1px] px-[3px] text-sm rounded-full cursor-pointer ${
                    index !== 0 ? "-ml-[5px]" : ""
                  }`}
                  style={{ zIndex: message.reactions.length - index }}
                >
                  {reaction?.emoji}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Modal
        open={open}
        setOpen={setOpen}
        title={"Delete Message"}
        subTitle={"Are you sure you want to delete this message?"}
        handleClick={handleDelete}
        buttonText={"DELETE"}
      />
    </div>
  );
};

export default Message;
