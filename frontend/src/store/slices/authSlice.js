import { createSlice } from "@reduxjs/toolkit";

const initialState = { value: 0 };

const authSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
  },
});

export const { increment, decrement } = authSlice.actions;
export default authSlice.reducer;
