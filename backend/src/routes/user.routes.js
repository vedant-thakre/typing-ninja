import express from "express";
import {
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
  resetPassword,
  updateUserDetails,
  verifyEmail,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middleware/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/google-auth", googleAuth);
router.post("/login", login);
router.get("/logout", logout);
router.get("/user-profile", verifyJWT, getUser);
router.put("/update-user", verifyJWT, updateUserDetails);
router.get("/verify-email", verifyJWT, verifyEmail);
router.post("/confirm-email-otp", verifyJWT, confirmEmailOtp);
router.get("/refresh-access-token", refreshAccessToken);
router.get("/get-user-profile", getUserProfile);
router.post("/forgot-password", forgotPassword);
router.patch("/rest-password", resetPassword);
router.post("/confirm-otp", confirmOTP);

export default router;
