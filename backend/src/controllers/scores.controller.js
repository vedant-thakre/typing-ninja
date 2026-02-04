import { Snippet } from "../models/snippet.model.js";
import { asyncHandler, ErrorHandler, Response } from "../utils/handlers.js";

export const getHighScores = asyncHandler(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const skip = (page - 1) * limit;
});
