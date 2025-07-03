import express from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { addReactionToMessage, deleteMessage, editMessage, removeReactionFromMessage, replyToMessage, sendMessage } from "../controllers/message.controller.js";

const router = express.Router();


router.post("/send/:id", verifyJWT, sendMessage);
router.post("/react-to-message/:id", verifyJWT, addReactionToMessage);
router.post("/remove-reaction/:id", verifyJWT, removeReactionFromMessage);
router.post("/reply-message/:id", verifyJWT, replyToMessage);
router.put("/edit/:id", verifyJWT, editMessage);
router.delete("/delete/:id", verifyJWT, deleteMessage);



export default router;