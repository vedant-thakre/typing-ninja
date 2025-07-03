import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../services/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
  loading: false,
  acceptlaoding: false,
  rejectLoading: false,
  pendingSnippets: [],
  snippet: null,
};

export const getPendingSnippetsList = createAsyncThunk(
  "snippet/pending-list",
  async ({ page, limit }) => {
    try {
      const response = await axiosInstance.get(
        `admin/list-pending-snippets?page=${page}&limit=${limit}`
      );
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
      throw error;
    }
  }
)

export const requestSnippet = createAsyncThunk(
  "snippet/request-snippet",
  async ({ title, content, difficulty }) => {
    try {
      const response = await axiosInstance.post(`admin/add-snippet`, {
        title,
        content,
        difficulty,
      });
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
export const acceptSnippet = createAsyncThunk(
  "snippet/accept-snippet",
  async ({ id }, { dispatch }) => {
    try {
      const response = await axiosInstance.patch(`admin/approve-snippet/${id}`);
      if (response?.status === 200) {
        toast.success(response.data.message);
        dispatch(getPendingSnippetsList({ page: 1, limit: 10 }));
      }
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
      throw error;
    }
  }
);
export const rejectSnippet = createAsyncThunk(
  "snippet/reject-snippet",
  async ({ id }, { dispatch }) => {
    try {
      const response = await axiosInstance.delete(`admin/reject-snippet/${id}`);
      if (response?.status === 200) {
        toast.success(response.data.message);
        dispatch(getPendingSnippetsList({ page: 1, limit: 10 }));
      }
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
      throw error;
    }
  }
);

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setViewSnippet: (state, action) => {
      state.snippet = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(requestSnippet.pending, (state) => {
        state.loading = true;
      })
      .addCase(requestSnippet.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(requestSnippet.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getPendingSnippetsList.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPendingSnippetsList.fulfilled, (state, action) => {
        state.loading = false;
        state.pendingSnippets = action.payload.data;
      })
      .addCase(getPendingSnippetsList.rejected, (state) => {
        state.loading = false;
      })
      .addCase(acceptSnippet.pending, (state) => {
        state.acceptlaoding = true;
      })
      .addCase(acceptSnippet.fulfilled, (state, action) => {
        state.acceptlaoding = false;
      })
      .addCase(acceptSnippet.rejected, (state) => {
        state.acceptlaoding = false;
      })
      .addCase(rejectSnippet.pending, (state) => {
        state.rejectLoading = true;
      })
      .addCase(rejectSnippet.fulfilled, (state, action) => {
        state.rejectLoading = false;
      })
      .addCase(rejectSnippet.rejected, (state) => {
        state.rejectLoading = false;
      });
  },
});

export default gameSlice.reducer;

export const { setViewSnippet } = gameSlice.actions;
