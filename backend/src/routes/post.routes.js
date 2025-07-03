import express from 'express';
import { verifyJWT } from "../middleware/auth.middleware.js";
import { createPost, getAllPosts, getPost } from '../controllers/post.controller.js';

const router = express.Router();

router.post("/create", verifyJWT, createPost);
router.get("/all-posts", getAllPosts);
router.get("/:id", getPost);


export default router;