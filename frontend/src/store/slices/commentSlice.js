import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../services/axiosInstance";
import toast from "react-hot-toast";
import { getPost } from "./postSlice";

const initialState = {
    loading: false,
    comment: null,
};

export const postComment = createAsyncThunk( "comment/add-comment", async ({comment, id}, {dispatch}) => {
    try {
      const response = await axiosInstance.post(
        `comments/add-comment/${id}`,
        {
          content: comment,
        }
      );
      if(response?.status === 200){
        toast.success(response.data.message);
        dispatch(getPost(id));
      }
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
      throw error;
    }
  }
);

export const replyPostComment = createAsyncThunk(
  "comment/reply-comment",
  async ({ comment, postId, commentId }, { dispatch }) => {
    try {
      const response = await axiosInstance.post(
        `comments/reply-comment/${commentId}`,
        {
          content: comment,
          postId: postId,
        }
      );
      if (response?.status === 200) {
        toast.success(response.data.message);
        dispatch(getPost(postId));
      }
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
      throw error;
    }
  }
);

const commentSlice = createSlice({
    name: "comment",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
          .addCase(postComment.pending, (state) => {
            state.loading = true;
          })
          .addCase(postComment.fulfilled, (state, action) => {
            state.loading = false;
          })
          .addCase(postComment.rejected, (state) => {
            state.loading = false;
          })
          .addCase(replyPostComment.pending, (state) => {
            state.loading = true;
          })
          .addCase(replyPostComment.fulfilled, (state, action) => {
            state.loading = false;
          })
          .addCase(replyPostComment.rejected, (state) => {
            state.loading = false;
          });
      },
  });
  
  export default commentSlice.reducer;  