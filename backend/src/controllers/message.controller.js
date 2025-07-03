import mongoose from "mongoose";
import { asyncHandler, ErrorHandler, Response } from "../utils/handlers.js";
import { User } from "../models/user.model.js";
import { Message } from "../models/message.model.js";
import { Chat } from "../models/chat.model.js";
import { io } from "../lib/socket.js";

export const sendMessage = asyncHandler(async (req, res) => {
  const { id:receiverId } = req.params;
  const { content, isFirstMessage, isWorldChat } = req.body;
  const senderId = req.user._id;

  if (!content) {
    throw new ErrorHandler(400, "Message content cannot be empty");
  }

  let chat, message;

  if(isWorldChat){
    chat = await Chat.findOne({
      isWorldChat: true
    })
    message = await Message.create({
      sender: senderId,
      chat: chat._id,
      content,
    });
  }else{
      if (receiverId === senderId.toString()) {
        throw new ErrorHandler(400, "Cannot send message to yourself");
      }

      if (
        !req.user?.friends.includes(new mongoose.Types.ObjectId(receiverId))
      ) {
        throw new ErrorHandler(400, "You are not friends with this user");
      }

      const receiver = await User.findById(receiverId);

      if (!receiver) {
        throw new ErrorHandler(404, "Friend not found");
      }
    chat = await Chat.findOne({
      isGroupChat: false,
      members: { $all: [senderId, receiverId], $size: 2 },
    });

    if (isFirstMessage) {
      if (!chat) {
        chat = await Chat.create({
          members: [senderId, receiverId],
        });
      }
    }
    // Create the message
    message = await Message.create({
      sender: senderId,
      chat: chat._id,
      content,
    });
    chat.latestMessage = message._id;
  }
  
  chat.messages.push(message._id);
  await chat.save();

  // Populate message if needed
  const populatedMessage = await Message.findById(message._id)
    .populate("sender", "_id username avatar")


  if (isWorldChat) {
    io.to("world-chat").emit("worldChatMessage", populatedMessage);
  } else {
    // Emit to the specific user (receiver)
    // io.to(receiverId).emit("newMessage", populatedMessage);
  }  

  return res
    .status(200)
    .json(new Response(200, populatedMessage, "Message sent successfully"));
});

export const addReactionToMessage = asyncHandler(async (req, res) => {
  const { id: messageId } = req.params;
  const { emoji } = req.body;
  const userId = req.user._id;

  if (!messageId) {
    throw new ErrorHandler(400, "Message ID is required");
  }

  const message = await Message.findById(messageId);

  if (!message) {
    throw new ErrorHandler(404, "Message not found");
  }

  if (message.sender.toString() === userId.toString()) {
    throw new ErrorHandler(400, "You cannot react to your own message");
  }

  // Remove any existing reaction by the same user
  message.reactions = message.reactions.filter(
    (r) => r.user.toString() !== userId.toString()
  );

  // Add the new reaction
  message.reactions.push({ emoji, user: userId });

  await message.save();

  return res
    .status(200)
    .json(new Response(200, message, "Reaction added successfully"));
});

export const removeReactionFromMessage = asyncHandler(async (req, res) => {
  const { id:messageId } = req.params;
  const { emoji } = req.body;
  const userId = req.user._id;


  if (!messageId) {
    throw new ErrorHandler(400, "Message ID is required");
  }

  const message = await Message.findById(messageId);

  if (!message) {
    throw new ErrorHandler(404, "Message not found");
  }

  message.reactions = message.reactions.filter( 
    (r) => r.user.toString() !== userId.toString() || r.emoji !== emoji 
  );

  await message.save();

  return res  
    .status(200)
    .json(new Response(200, message, "Reaction removed successfully")); 
});

export const replyToMessage = asyncHandler(async (req, res) => {
  const { id:messageId } = req.params;
  const { content, chatId } = req.body;
  const senderId = req.user._id;


  if (!content) {
    throw new ErrorHandler(400, "Message content cannot be empty");
  }

  if (!messageId) {
    throw new ErrorHandler(400, "Message ID is required");
  }

  // Remove after testing
  const originalMessage = await Message.findById(messageId);
  if (!originalMessage) {
    throw new ErrorHandler(404, "Original message not found");
  }

  if (originalMessage.chat.toString() !== chatId) {
    throw new ErrorHandler(400, "Message does not belong to the given chat");
  }
  // upto this

  const message = await Message.create({
    content,
    sender: senderId,
    replyTo: messageId,
    chat: chatId,
  });

  const chat = await Chat.findById(chatId);
  chat.messages.push(message._id);
  chat.latestMessage = message._id;
  await chat.save();

  const populatedMessage = await Message.findById(message._id)
    .populate("sender", "username _id avatar")
    .populate({
      path: "replyTo",
      select: "content _id", 
    });

  return res
    .status(200)
    .json(new Response(200, populatedMessage, "Message sent successfully"));
}); 

export const editMessage = asyncHandler(async (req, res) => {
  const { id:messageId } = req.params;
  const { content } = req.body;

  if (!content) {
    throw new ErrorHandler(400, "Message content cannot be empty");
  }

  if (!messageId) {
    throw new ErrorHandler(400, "Message ID is required");
  }

  const message = await Message.findByIdAndUpdate(
    messageId,
    { content, isEdited: true },
    { new: true }
  );

  if (!message) {
    throw new ErrorHandler(404, "Message not found");
  }

  return res
    .status(200)
    .json(new Response(200, message, "Message updated successfully"));
});

export const deleteMessage = asyncHandler(async (req, res) => {
  const { id:messageId } = req.params;
  const content = "This message has been deleted";

  if (!messageId) {
    throw new ErrorHandler(400, "Message ID is required");
  }

  const message = await Message.findByIdAndUpdate(
    messageId,
    { content, isDeleted: true },
    { new: true }
  );

  if (!message) {
    throw new ErrorHandler(404, "Message not found");
  }

  return res
    .status(200)
    .json(new Response(200, message, "Message deleted successfully"));
});
