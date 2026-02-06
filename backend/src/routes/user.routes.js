import express from "express";
import {
  acceptFriendRequest,
  confirmEmailOtp,
  confirmOTP,
  forgotPassword,
  getUser,
  getUserProfile,
  googleAuth,
  login,
  logout,
  refreshAccessToken,
  register,
  rejectFriendRequest,
  removeFriend,
  resetPassword,
  updateUserDetails,
  verifyEmail,
  sendFriendRequest,
  getAllAvatars,
  getFriendsAndRequests,
  changeAvatar,
  checkIsFriend,
  searchUser,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/google-auth", googleAuth);
router.post("/login", login);
router.get("/logout", logout);
router.get("/user-profile", verifyJWT, getUser);
router.put("/update-user", verifyJWT, updateUserDetails);
router.get("/verify-email", verifyJWT, verifyEmail);
router.post("/confirm-email-otp", verifyJWT, confirmEmailOtp);
router.post("/add-friend", verifyJWT, sendFriendRequest);
router.post("/remove-friend", verifyJWT, removeFriend);
router.post("/accept-friend-request", verifyJWT, acceptFriendRequest);
router.post("/reject-friend-request", verifyJWT, rejectFriendRequest);
router.get("/get-friends-requsts", verifyJWT, getFriendsAndRequests);
router.get("/get-all-avatars/:folder", verifyJWT, getAllAvatars);
router.get("/check-isfriend/:id", verifyJWT, checkIsFriend);
router.get("/search", searchUser);
router.patch("/change-avatar", verifyJWT, changeAvatar);
router.get("/refresh-access-token", refreshAccessToken);
router.get("/get-user-profile", getUserProfile);
router.post("/forgot-password-otp", forgotPassword);
router.patch("/rest-password", resetPassword);
router.post("/confirm-otp", confirmOTP);

// admin routes

export default router;
