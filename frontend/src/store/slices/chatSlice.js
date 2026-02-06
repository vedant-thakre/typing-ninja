import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../services/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
  loading: false,
  status: false,
  chats: [],
  chatFriends: [],
  chat: null,
  worldChat: [],
  editMessage: null,
  replyMessage: null,
  deleteMessage: null,
};

export const getChats = createAsyncThunk(
  "chat/chats",
  async ({ isGroupChat, search }) => {
    try {
      const response = await axiosInstance.get(
        `/chats/all-chats?isGroupChat=${isGroupChat}&search=${search}`,
      );
      if (response?.data?.status === 200) {
        toast.success(response.data.message);
      }
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
      throw error;
    }
  },
);

export const getChat = createAsyncThunk(
  "chat/chat",
  async ({ id, isWorldChat }) => {
    try {
      const response = await axiosInstance.get(
        `/chats/user-chat?id=${id}&&isWorldChat=${isWorldChat}`,
      );
      if (response?.data?.status === 200) {
        // toast.success(response.data.message);
      }
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
      throw error;
    }
  },
);

export const sendMessage = createAsyncThunk(
  "chat/send-message",
  async (
    { id, message, chatId, isFirstMessage, isWorldChat = false },
    { dispatch, getState },
  ) => {
    try {
      const response = await axiosInstance.post(`/messages/send/${id}`, {
        content: message,
        isFirstMessage: isFirstMessage,
        isWorldChat,
      });

      if (response?.data?.status === 200) {
        if (!isWorldChat) {
          dispatch(getChat({ id }));
        } else {
          const message = response?.data?.data;
          const state = getState();
          const currentWorldChat = state.chat.worldChat || [];
          const updatedMessages = [...currentWorldChat?.messages, message];
          dispatch(
            setWorldChat({ ...currentWorldChat, messages: updatedMessages }),
          );
          // dispatch(getWorldChat());
        }
      }
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
      throw error;
    }
  },
);

export const editMessage = createAsyncThunk(
  "chat/edit-message",
  async ({ messageId, id, content, isFirstMessage = false }, { dispatch }) => {
    try {
      const response = await axiosInstance.put(`/messages/edit/${messageId}`, {
        content: content,
        isFirstMessage: isFirstMessage,
      });

      if (response?.data?.status === 200) {
        dispatch(getChat({ id }));
      }
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
      throw error;
    }
  },
);

export const replyToMessage = createAsyncThunk(
  "chat/reply-message",
  async ({ messageId, id, content, chatId }, { dispatch }) => {
    try {
      const response = await axiosInstance.post(
        `/messages/reply-message/${messageId}`,
        {
          content: content,
          chatId: chatId,
        },
      );

      if (response?.data?.status === 200) {
        dispatch(getChat({ id }));
      }
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
      throw error;
    }
  },
);

export const deleteMessage = createAsyncThunk(
  "chat/delete-message",
  async ({ messageId, id }, { dispatch }) => {
    try {
      const response = await axiosInstance.delete(
        `/messages/delete/${messageId}`,
      );

      if (response?.data?.status === 200) {
        dispatch(getChat({ id }));
      }
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
      throw error;
    }
  },
);

export const reactOnMessage = createAsyncThunk(
  "chat/react-on-message",
  async ({ messageId, id, emoji }, { dispatch }) => {
    try {
      const response = await axiosInstance.post(
        `/messages/react-to-message/${messageId}`,
        { emoji },
      );

      if (response?.data?.status === 200) {
        dispatch(getChat({ id }));
      }
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
      throw error;
    }
  },
);

export const getWorldChat = createAsyncThunk("chat/world-chat", async () => {
  try {
    const response = await axiosInstance.get(
      `/chats/world-chat?isWorldChat=true`,
    );
    if (response?.data?.status === 200) {
      // toast.success(response.data.message);
    }
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
    throw error;
  }
});

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setEditMessage: (state, action) => {
      state.editMessage = action.payload;
    },
    setReplyMessage: (state, action) => {
      state.replyMessage = action.payload;
    },
    setDeleteMessage: (state, action) => {
      state.deleteMessage = action.payload;
    },
    setWorldChat: (state, action) => {
      state.worldChat = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getChats.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getChats.fulfilled, (state, action) => {
      state.loading = false;
      state.chats = action.payload.data.chats;
      state.chatFriends = action.payload.data.friends;
    });
    builder.addCase(getChats.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(getChat.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getChat.fulfilled, (state, action) => {
      state.loading = false;
      state.chat = action.payload.data;
    });
    builder.addCase(getChat.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(getWorldChat.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getWorldChat.fulfilled, (state, action) => {
      state.loading = false;
      state.worldChat = action.payload.data;
    });
    builder.addCase(getWorldChat.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default chatSlice.reducer;
export const {
  setEditMessage,
  setReplyMessage,
  setDeleteMessage,
  setShowMessageOptions,
  setWorldChat,
} = chatSlice.actions;
