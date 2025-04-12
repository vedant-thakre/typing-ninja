import express from 'express';
import { verifyJWT } from '../middleware/auth.js';
import { createPost, getAllPosts, getPost } from '../controllers/post.controller.js';

const router = express.Router();

router.post("/create", verifyJWT, createPost);
router.get("/all-posts", verifyJWT, getAllPosts);
router.get("/:id", verifyJWT, getPost);


export default router;