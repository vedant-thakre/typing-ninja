import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../services/axiosInstance";
import toast from "react-hot-toast";

const accessToken = localStorage.getItem("accessToken")
  ? localStorage.getItem("accessToken")
  : null;

const theme = localStorage.getItem("theme")
  ? localStorage.getItem("theme")
  : "dark";

const initialState = {
  loading: false,
  apiLoading: false,
  status: false,
  userData: null,
  avatars: [],
  isFriend: false,
  showResponsiveNav: false,
  searchResultCount: 0,
  search: [],
  accessToken,
  theme,
  otp: null,
};

export const registerUser = createAsyncThunk("user/register", async (user) => {
  try {
    const response = await axiosInstance.post("users/register", user);
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
    throw error;
  }
});

export const verifyEmailOTP = createAsyncThunk(
  "user/confirm-email-otp",
  async (data) => {
    try {
      const response = await axiosInstance.post(
        "users/confirm-email-otp",
        data,
      );
      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
      throw error;
    }
  },
);

export const validateEmail = createAsyncThunk("user/verify-email", async () => {
  try {
    const response = await axiosInstance.get("users/verify-email");
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
    throw error;
  }
});

export const googleAuth = createAsyncThunk("user/google-auth", async (user) => {
  try {
    const response = await axiosInstance.post("users/google-auth", user);
    console.log(response.data);
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
    throw error;
  }
});

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
    toast.success("Profile fetched ");
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
  },
);

export const logoutUser = createAsyncThunk("user/logout", async () => {
  try {
    const response = await axiosInstance.get("users/logout");
    toast.success(response.data.message);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("username");
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
    throw error;
  }
});

export const refreshAccessToken = createAsyncThunk(
  "user/refresh-token",
  async () => {
    try {
      const response = await axiosInstance.get("users/refresh-access-token");
      localStorage.setItem("accessToken", response.data.data.accessToken);
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
      throw error;
    }
  },
);

export const getSearchedUser = createAsyncThunk(
  "user/search",
  async (username) => {
    try {
      const response = await axiosInstance.get(
        `users/get-user-profile?username=${username}`,
      );
      toast.success("Search User fetched");
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
      throw error;
    }
  },
);

export const getFriendsAndRequestsList = createAsyncThunk(
  "user/friends-requests",
  async ({ isFriend, search, pageNo, limit }) => {
    try {
      const response = await axiosInstance.get(
        `users/get-friends-requsts?isFriend=${isFriend}&search=${search}&pageNo=${pageNo}&limit=${limit}`,
      );
      toast.success("Friends fetched");
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
      throw error;
    }
  },
);

export const acceptRequest = createAsyncThunk(
  "user/accept-friend-request",
  async (id) => {
    try {
      const response = await axiosInstance.post(`users/accept-friend-request`, {
        id,
      });
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
      throw error;
    }
  },
);

export const sendRequest = createAsyncThunk(
  "user/accept-friend-request",
  async (id) => {
    try {
      const response = await axiosInstance.post(`users/add-friend`, {
        id,
      });
      if (response?.status === 200) {
        toast.success(response.data.message);
      }
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
      throw error;
    }
  },
);

export const rejectRequest = createAsyncThunk(
  "user/reject-friend-request",
  async (id) => {
    try {
      const response = await axiosInstance.post(`users/reject-friend-request`, {
        id,
      });
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
      throw error;
    }
  },
);

export const removeFriend = createAsyncThunk(
  "user/remove-friend",
  async (id) => {
    try {
      const response = await axiosInstance.post(`users/remove-friend`, {
        id,
      });
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
      throw error;
    }
  },
);

export const getAvatars = createAsyncThunk(
  "user/all-avatars",
  async (folder) => {
    try {
      const response = await axiosInstance.get(
        `users/get-all-avatars/${folder}`,
      );
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
      throw error;
    }
  },
);

export const updateAvatar = createAsyncThunk(
  "user/change-avatar",
  async (avatar, { dispatch }) => {
    try {
      const response = await axiosInstance.patch(`users/change-avatar`, {
        avatar,
      });
      if (response?.status === 200) {
        dispatch(getUserProfile());
        toast.success(response.data.message);
      }
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
      throw error;
    }
  },
);

export const checkFriend = createAsyncThunk("user/check-friend", async (id) => {
  try {
    const response = await axiosInstance.get(`users/check-isfriend/${id}`);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
    throw error;
  }
});

export const searchUser = createAsyncThunk(
  "user/search-result",
  async ({ user, page }) => {
    try {
      const response = await axiosInstance.get(
        `users/search?user=${user}&page=${page}&limit=${10}`,
      );
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
      throw error;
    }
  },
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    setShowResponsiveNav: (state, action) => {
      state.showResponsiveNav = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.status = true;
      state.loading = false;
      state.userData = action.payload.data?.user;
    });
    builder.addCase(verifyEmailOTP.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(verifyEmailOTP.fulfilled, (state, action) => {
      state.status = true;
      state.loading = false;
      state.otp = action.payload.data?.otp;
    });
    builder.addCase(validateEmail.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(validateEmail.fulfilled, (state) => {
      state.status = true;
      state.loading = false;
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
    builder.addCase(getAvatars.pending, (state) => {
      state.apiLoading = true;
    });
    builder.addCase(getAvatars.fulfilled, (state, action) => {
      state.apiLoading = false;
      state.avatars = action.payload.data;
    });
    builder.addCase(getAvatars.rejected, (state) => {
      state.apiLoading = false;
    });
    builder.addCase(checkFriend.pending, (state) => {
      state.apiLoading = true;
    });
    builder.addCase(checkFriend.fulfilled, (state, action) => {
      state.apiLoading = false;
      console.log("checkFriend", action.payload);
      state.isFriend = action.payload.data;
    });
    builder.addCase(checkFriend.rejected, (state) => {
      state.apiLoading = false;
    });
    builder.addCase(sendRequest.pending, (state) => {
      state.apiLoading = true;
    });
    builder.addCase(sendRequest.fulfilled, (state, action) => {
      state.apiLoading = false;
      state.isFriend = { isFriend: false, requested: true };
    });
    builder.addCase(sendRequest.rejected, (state) => {
      state.apiLoading = false;
    });
    builder.addCase(searchUser.pending, (state) => {
      state.apiLoading = true;
    });
    builder.addCase(searchUser.fulfilled, (state, action) => {
      state.apiLoading = false;
      state.search = action.payload.data.data;
      console.log("search", action.payload);
      state.searchResultCount = action.payload.data.metadata.total;
    });
    builder.addCase(searchUser.rejected, (state) => {
      state.apiLoading = false;
    });
  },
});

export const { setTheme, setShowResponsiveNav } = userSlice.actions;
export default userSlice.reducer;
