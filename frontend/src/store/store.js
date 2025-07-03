import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import postSlice from "./slices/postSlice";
import commentSlice from "./slices/commentSlice";
import chatSlice from "./slices/chatSlice";
import gameSlice from "./slices/gameSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    post: postSlice,
    comment: commentSlice,
    chat: chatSlice,
    game: gameSlice,
  },
});
