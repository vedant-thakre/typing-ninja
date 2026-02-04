import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../services/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
  loading: false,
  comment: null,
  cache: {},
};

export const fetchHighScores = createAsyncThunk(
  "scores/fetch",
  async (
    { page = 1, limit = 10, difficulty = "", query = "wpm" },
    { getState, rejectWithValue },
  ) => {
    const cacheKey = `${difficulty || "all"}-${query}-${page}-${limit}`;

    const { scores } = getState();

    // 🧠 CACHE HIT
    if (scores.cache[cacheKey]) {
      return {
        cached: true,
        cacheKey,
        data: scores.cache[cacheKey],
      };
    }

    try {
      const response = await axiosInstance.get("/highscores", {
        params: { page, limit, difficulty, query },
      });

      return {
        cached: false,
        cacheKey,
        data: response?.data?.data,
      };
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch scores");
      return rejectWithValue(error.response?.data);
    }
  },
);

const scoreSlice = createSlice({
  name: "scores",
  initialState,
  reducers: {
    clearScoresCache: (state) => {
      state.cache = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHighScores.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHighScores.fulfilled, (state, action) => {
        state.loading = false;

        const { cacheKey, data, cached } = action.payload;

        if (!cached) {
          state.cache[cacheKey] = data;
        }
      })
      .addCase(fetchHighScores.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { clearScoresCache } = scoreSlice.actions;
export default scoreSlice.reducer;
