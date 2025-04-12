import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../services/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
    loading: true,
    status: false,
    posts: [],
    post: null,
};

export const getPosts = createAsyncThunk(
  "post/posts",
  async ({ pageNo, limit, sortOrder }) => {
    try {
      const response = await axiosInstance.get(
        `posts/all-posts?page=${pageNo}&limit=${limit}&sort=${sortOrder}`
      );
      console.log("response", response.data);
      if (response?.status === 200) {
        toast.success(response.data.message);
      }
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
      throw error;
    }
  }
);

export const getPost = createAsyncThunk("post/post", async (id) => {
  try {
    const response = await axiosInstance.get(`posts/${id}`);
    console.log("response", response.data);
    if (response?.status === 200) {
      toast.success(response.data.message);
    }
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
    throw error;
  }
})

const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getPosts.pending, (state) => {
                state.loading = true;
                state.status = false;
            })
            .addCase(getPosts.fulfilled, (state, action) => {
                state.loading = false;
                state.status = true;
                state.posts = action.payload.data;
            })
            .addCase(getPosts.rejected, (state, action) => {
                state.loading = false;
                state.status = false;
            })
            .addCase(getPost.pending, (state) => {
                state.loading = true;
                state.status = false;
            })
            .addCase(getPost.fulfilled, (state, action) => {
                state.loading = false;
                state.status = true;
                state.post = action.payload.data;
            })
            .addCase(getPost.rejected, (state, action) => {
                state.loading = false;
                state.status = false;
            });
    },
});

export default postSlice.reducer;