import express from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { uploadAvatar } from "../controllers/user.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import { User } from "../models/user.model.js";
import { verifyAdmin } from "../middleware/admin.middleware.js";
import {
  addSnippet,
  approveSnippet,
  pendingSnippets,
  rejectSnippet,
} from "../controllers/snippet.controller.js";
import { Snippet } from "../models/snippet.model.js";

const router = express.Router();

router.post(
  "/upload-avatar",
  verifyJWT,
  verifyAdmin,
  upload.single("avatar"),
  uploadAvatar
);
router.post("/add-snippet", verifyJWT, addSnippet);
router.patch("/approve-snippet/:id", verifyJWT, verifyAdmin, approveSnippet);
router.delete("/reject-snippet/:id", verifyJWT, verifyAdmin, rejectSnippet);
router.get("/list-pending-snippets", verifyJWT, verifyAdmin, pendingSnippets);
// router.get("/bulk-snippets", async (req, res) => {
//     try {
//       const snippets = data;
//       // Add difficulty = 'medium' to each snippet
//       const snippetsWithDifficulty = snippets.map(snippet => ({
//         ...snippet,
//         difficulty: 'hard',
//         status: "approved",
//         author: "leoved",
//       }));
  
//       const insertedSnippets = await Snippet.insertMany(snippetsWithDifficulty);
//       res.status(201).json({ success: true, insertedCount: insertedSnippets.length });
//     } catch (error) {
//       console.error('Error inserting snippets:', error);
//       res.status(500).json({ success: false, message: 'Failed to insert snippets.' });
//     }
//   });
export default router;

