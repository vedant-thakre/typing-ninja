import { Snippet } from "../models/snippet.model.js";
import { asyncHandler, ErrorHandler, Response } from "../utils/handlers.js";

export const getHighScores = asyncHandler(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const skip = (page - 1) * limit;

  const difficulty = req.query.difficulty || "all";
  const sortBy = req.query.query || "wpm"; // wpm | matchCount

  const matchStage = {};
  if (difficulty !== "all") {
    matchStage.difficulty = difficulty;
  }

  // Sort users after grouping
  const finalSortStage =
    sortBy === "matchCount" ? { "user.matchCount": -1 } : { bestWpm: -1 };

  const pipeline = [
    // 1️⃣ Filter snippets
    { $match: matchStage },

    // 2️⃣ Expand highscores
    { $unwind: "$highScores" },

    // 3️⃣ Join user
    {
      $lookup: {
        from: "users",
        localField: "highScores.user",
        foreignField: "_id",
        as: "user",
      },
    },
    { $unwind: "$user" },
  ];

  // ---- IMPORTANT DIFFERENCE ----
  if (sortBy === "wpm") {
    // 🔥 Ensure best WPM comes first
    pipeline.push({
      $sort: { "highScores.wpm": -1 },
    });

    pipeline.push({
      $group: {
        _id: "$user._id",
        bestWpm: { $first: "$highScores.wpm" },
        bestWpmDate: { $first: "$highScores.createdAt" },
        user: { $first: "$user" },
        difficulty: { $addToSet: "$difficulty" },
      },
    });
  } else {
    // matchCount leaderboard (date not needed)
    pipeline.push({
      $group: {
        _id: "$user._id",
        bestWpm: { $max: "$highScores.wpm" },
        user: { $first: "$user" },
        difficulty: { $addToSet: "$difficulty" },
      },
    });
  }

  pipeline.push(
    // 5️⃣ Sort users
    { $sort: finalSortStage },

    // 6️⃣ Pagination
    { $skip: skip },
    { $limit: limit },

    // 7️⃣ Final projection
    {
      $project: {
        _id: 0,
        userId: "$user._id",
        username: "$user.username",
        avatar: "$user.avatar",
        wpm: "$bestWpm",
        matchCount: "$user.matchCount",

        // 🔥 Include date ONLY for WPM leaderboard
        date: sortBy === "wpm" ? "$bestWpmDate" : "$$REMOVE",

        difficulty: {
          $cond: [
            { $gt: [{ $size: "$difficulty" }, 1] },
            "all",
            { $arrayElemAt: ["$difficulty", 0] },
          ],
        },
      },
    },
  );

  const leaderboard = await Snippet.aggregate(pipeline);

  const result = {
    page,
    limit,
    count: leaderboard.length,
    data: leaderboard,
  };

  return res
    .status(200)
    .json(new Response(200, result, "Leaderboard fetched successfully"));
});
