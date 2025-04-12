import express from 'express';
import { verifyJWT } from '../middleware/auth.js';
import { addComment, deleteComment, editComment, replyToComment } from '../controllers/comment.controller.js';

const router = express.Router();

router.post("/add-comment/:id", verifyJWT, addComment);
router.post("/reply-comment/:id", verifyJWT, replyToComment);
router.put("/edit-comment/:id", verifyJWT, editComment);
router.delete("/delete-comment/:id", verifyJWT, deleteComment);

export default router;


