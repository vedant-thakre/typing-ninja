import mongoose from "mongoose";
import { asyncHandler, ErrorHandler, Response } from "../utils/handlers.js";
import { Chat } from "../models/chat.model.js";
import { User } from "../models/user.model.js";

export const getChats = asyncHandler(async (req, res) => {
  const { isGroupChat, search = "" } = req.query;
  const currentUserId = req.user._id;
  const isGroupChatBoolean = isGroupChat === "true";

  const chatPipeline = [
    {
      $match: {
        isGroupChat: isGroupChatBoolean,
        members: new mongoose.Types.ObjectId(currentUserId),
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "members",
        foreignField: "_id",
        as: "members",
        pipeline: [
          {
            $project: {
              _id: 1,
              email: 1,
              username: 1,
              avatar: 1,
            },
          },
        ],
      },
    },
    {
      $lookup: {
        from: "messages",
        localField: "latestMessage",
        foreignField: "_id",
        as: "latestMessage",
        pipeline: [
          {
            $project: {
              _id: 1,
              content: 1,
              sender: 1,
              isDeleted: 1,
              updatedAt: 1,
            },
          },
        ],
      },
    },
    { $unwind: { path: "$latestMessage", preserveNullAndEmptyArrays: true } },
  ];

  if (isGroupChatBoolean) {
    chatPipeline.unshift({
      $match: {
        isGroupChat: true,
        members: new mongoose.Types.ObjectId(currentUserId),
      },
    });
  } else {
    if (search) {
      chatPipeline.push({
        $addFields: {
          friend: {
            $first: {
              $filter: {
                input: "$members",
                as: "member",
                cond: {
                  $ne: [
                    "$$member._id",
                    new mongoose.Types.ObjectId(currentUserId),
                  ],
                },
              },
            },
          },
        },
      });
      chatPipeline.push({
        $match: { "friend.username": { $regex: search, $options: "i" } },
      });
    }
  }

  const chats = await Chat.aggregate(chatPipeline);

  const processedChats = chats.map((chat) => {
    if (!chat.isGroupChat) {
      const friend = chat.members.find(
        (member) => member._id.toString() !== currentUserId.toString()
      );
      const newChat = {
        ...chat,
        friend,
      };
      const { members, ...rest } = newChat;
      return rest;
    }
    return chat;
  });

  let friends = [];

  // If search is present, return matching friends that have no chat
  if (!isGroupChatBoolean && search) {
    // Assuming req.user.friends is an array of ObjectIds
    const friendIds = req.user.friends;

    const allFriendIds = chats.map((c) => c.friend?._id?.toString());

    friends = await User.find({
      _id: {
        $in: friendIds, // Only from friends list
        $ne: currentUserId, // Not the current user
        ...(allFriendIds.length > 0 && { $nin: allFriendIds }), // Exclude already chatted
      },
      $or: [{ username: { $regex: search, $options: "i" } }],
    }).select("_id username email avatar");
  }

  res
    .status(200)
    .json(
      new Response(200, { chats: processedChats, friends }, "Chats fetched")
    );
});

export const getConversation = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { isWorldChat } = req.query;
  const userId = req.user._id;

  let chat;

  const messagePopulateOptions = {
    path: "messages",
    populate: [
      {
        path: "reactions.user",
        select: "_id", // or 'name avatar' if needed
      },
      {
        path: "replyTo",
        select: "_id content ",
      },
    ],
  };
  if (isWorldChat === "true") {
    messagePopulateOptions.populate.push({
      path: "sender",
      select: "username avatar",
    });
  }

  if (isWorldChat === "true") {
    chat = await Chat.findOne({ isWorldChat: true })
      .populate(messagePopulateOptions)
      .populate("latestMessage");
  } else {
    chat = await Chat.findOne({
      isGroupChat: false,
      members: { $all: [userId, id] },
    })
      .populate(messagePopulateOptions)
      .populate("latestMessage")
      .populate({
        path: "members",
        select: "username email avatar",
      });
  }

  // If no chat exists yet, return placeholder
  if (!chat) {
    const friend = await User.findById(id).select("username email avatar");
    if (!friend) {
      throw new ErrorHandler(404, "Friend not found");
    }

    return res.status(200).json(
      new Response(
        200,
        {
          isGroupChat: false,
          friend,
          messages: [],
        },
        "No chat exists yet"
      )
    );
  }

  // Flatten sender to just ID
  const updatedMessages = (chat.messages || []).map((msg) => {
    const msgObj = msg.toObject();

    return {
      ...msgObj,
      sender:
        isWorldChat === "true"
          ? msgObj.sender // full sender with username/avatar
          : msgObj.sender?._id?.toString() || msgObj.sender?.toString(), // flatten for private chats
    };
  });


  const formattedChat = {
    ...chat.toObject(),
    messages: updatedMessages,
  };

  // If private chat, isolate 'friend' from members
  if (!formattedChat.isGroupChat) {
    const friend = formattedChat.members.find(
      (member) => member._id.toString() !== userId.toString()
    );

    const { members, ...rest } = formattedChat;

    return res
      .status(200)
      .json(
        new Response(
          200,
          { ...rest, friend },
          "Conversation fetched successfully"
        )
      );
  }

  // Group chat or world chat
  return res
    .status(200)
    .json(
      new Response(200, formattedChat, "Conversation fetched successfully")
    );
});


export const deleteChat = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ErrorHandler(400, "Invalid chat ID");
  }

  const chat = await Chat.findById(id);

  if (!chat) {
    throw new ErrorHandler(404, "Chat not found");
  }

  await Chat.findByIdAndDelete(id);

  return res
    .status(200)
    .json(new Response(200, null, "Chat deleted successfully"));
});

export const createGroupChat = asyncHandler(async (req, res) => {
  const { chatName, users, isWorldChat } = req.body;

  let chat;

  if (isWorldChat && req?.user?.isAdmin) {
    const existingChat = await Chat.findOne({
      isWorldChat: true,
    });

    if (existingChat) {
      return res
        .status(200)
        .json(new Response(200, existingChat, "World chat already exists"));
    }

    chat = await Chat.create({
      chatName: "World Chat",
      isGroupChat: true,
      isWorldChat: true,
      groupAdmin: req.user._id,
      members: [],
    });

    if (!chat) {
      throw new ErrorHandler(500, "Failed to create world chat");
    }

    return res
      .status(200)
      .json(new Response(200, chat, "World chat created successfully"));
  } else {
    const updatedUsers = [...users, req.user._id.toString()];

    if (!chatName || !users) {
      throw new ErrorHandler(400, "Chat name and users are required");
    }

    chat = await Chat.create({
      chatName,
      isGroupChat: true,
      groupAdmin: req.user._id,
      members: updatedUsers,
    });
  }

  if (!chat) {
    throw new ErrorHandler(500, "Failed to create group chat");
  }

  return res
    .status(200)
    .json(new Response(200, chat, "Group chat created successfully"));
});

export const editGroupChat = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { chatName, users } = req.body;

  const updatedUsers = [...users, req.user._id.toString()];

  if (!id || !chatName || !users) {
    throw new ErrorHandler(400, "Chat ID, chat name, and user are required");
  }

  const updatedChat = await Chat.findByIdAndUpdate(
    id,
    { chatName, members: updatedUsers },
    { new: true }
  );

  if (!updatedChat) {
    throw new ErrorHandler(404, "Group Chat not found");
  }

  return res
    .status(200)
    .json(new Response(200, updatedChat, "Group chat updated successfully"));
});

export const leaveGroupChat = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new ErrorHandler(400, "Chat ID is required");
  }

  const chat = await Chat.findById(id);

  if (!chat) {
    throw new ErrorHandler(404, "Group Chat not found");
  }

  if (chat.groupAdmin.toString() === req.user._id.toString()) {
    // if groupAdmin is leaving the group delete the group
    await Chat.findByIdAndDelete(id);
    return res
      .status(200)
      .json(new Response(200, null, "Group chat deleted successfully"));
  } else {
    const updatedChat = await Chat.findByIdAndUpdate(
      id,
      { $pull: { members: req.user._id } },
      { new: true }
    );

    if (!updatedChat) {
      throw new ErrorHandler(404, "Group Chat not found");
    }

    return res
      .status(200)
      .json(new Response(200, updatedChat, "Group chat updated successfully"));
  }
});

export const deleteGroupChat = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new ErrorHandler(400, "Chat ID is required");
  }

  const chat = await Chat.findById(id);

  if (!chat) {
    throw new ErrorHandler(404, "Group Chat not found");
  }

  if (chat.groupAdmin.toString() !== req.user._id.toString()) {
    throw new ErrorHandler(400, "Only group admin can delete the group");
  }

  await Chat.findByIdAndDelete(id);

  return res
    .status(200)
    .json(new Response(200, null, "Group chat deleted successfully"));
});
