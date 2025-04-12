import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../services/axiosInstance";
import toast from "react-hot-toast";

const accessToken = localStorage.getItem("accessToken")
  ? localStorage.getItem("accessToken")
  : null;

const initialState = {
  loading: true,
  status: false,
  userData: null,
  accessToken,
};

export const registerUser = createAsyncThunk( "user/register", async (user) => {
    try {
      const response = await axiosInstance.post("users/register", user);
      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
      throw error;
    }
  }
);

export const googleAuth = createAsyncThunk( "user/google-auth", async (user) => {
    try {
      const response = await axiosInstance.post("users/google-auth", user);
      console.log(response.data);
      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
      throw error;
    }
  }
);

export const loginUser = createAsyncThunk("user/login", async (user) => {
  try {
    const response = await axiosInstance.post("users/login", user);
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
    throw error;
  }
});

export const getUserProfile = createAsyncThunk("user/profile", async () => {
  try {
    const response = await axiosInstance.get("users/user-profile");
    console.log("profile", response.data);
    toast.success("Profile fetched ")
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
    throw error;
  }
});

export const updateUserDetails = createAsyncThunk(
  "user/update-user",
  async (user) => {
    try {
      const response = await axiosInstance.put("users/update-user", user);
      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
      throw error;
    }
  }
);

export const logoutUser = createAsyncThunk("user/logout", async () => {
  try {
    const response = await axiosInstance.get("users/logout");
    toast.success(response.data.message);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("username");
    return response.data;
  }
  catch (error) {
    toast.error(error.response.data.message);
    throw error;
  }
});

export const refreshAccessToken = createAsyncThunk("user/refresh-token", async () => {
  try {
    const response = await axiosInstance.get("users/refresh-access-token");
    localStorage.setItem("accessToken", response.data.data.accessToken);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
    throw error;
  }
});

export const getSearchedUser = createAsyncThunk("user/search", async (username) => {
  try {
    const response = await axiosInstance.get(
      `users/get-user-profile?username=${username}`
    );
    toast.success("Search User fetched");
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
    throw error;
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.status = true;
      state.loading = false;
      state.userData = action.payload.data?.user;
    });
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.status = true;
      state.userData = action.payload.data?.user;
    });
    builder.addCase(googleAuth.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(googleAuth.fulfilled, (state, action) => {
      state.loading = false;
      state.status = true;
    });
    builder.addCase(getUserProfile.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUserProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.status = true;
      state.userData = action.payload.data;
    }); 
    builder.addCase(getUserProfile.rejected, (state) => {
      state.loading = false;
      state.status = false;
      state.userData = null;
    });
    builder.addCase(updateUserDetails.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateUserDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.status = true;
      state.userData = action.payload.data;
    });
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.status = false;
      state.userData = null;
    });
  },
});

export default userSlice.reducer;
