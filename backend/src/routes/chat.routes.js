import express from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import {
  createGroupChat,
  deleteGroupChat,
  editGroupChat,
  getChats,
  getConversation,
  leaveGroupChat,
} from "../controllers/chat.controller.js";

const router = express.Router();

router.get("/world-chat", getConversation);
router.get("/user-chat", verifyJWT, getConversation);
router.get("/all-chats", verifyJWT, getChats);
router.post("/create-group-chat", verifyJWT, createGroupChat);
router.put("/edit-group-chat/:id", verifyJWT, editGroupChat);
router.post("/leave-group-chat/:id", verifyJWT, leaveGroupChat);
router.delete("/delete-group-chat/:id", verifyJWT, deleteGroupChat);

export default router;
