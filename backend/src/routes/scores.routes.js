import express from "express";
import { getHighScores } from "../controllers/scores.controller.js";

const router = express.Router();

router.get("/", getHighScores);

export default router;
