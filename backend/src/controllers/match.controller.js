import { asyncHandler } from "../utils/handlers.js";
import { Match } from "../models/match.model.js";
import { Snippet } from "../models/snippet.model.js";
import { User } from "../models/user.model.js";

export const createMatch = asyncHandler(async (data) => {
  const { snippetId, userId, username, wpm, accuracy, errorCount } = data;

  const newMatch = await Match.create({
    mode: "solo",
    snippet: snippetId,
    users: [
      {
        userId,
        wpm,
        accuracy: `${accuracy}`,
        errors: `${errorCount}`,
      },
    ],
  });

  const snippet = await Snippet.findById(snippetId);

  if (!snippet) return newMatch;

  // update user
  const user = await User.findById(userId);
  user.matchCount += 1;
  await user.save();

  // Prepare new high score
  const newScore = { user: userId, wpm, createdAt: new Date() };

  // Insert and sort by descending WPM
  snippet.highScores.push(newScore);
  snippet.highScores.sort((a, b) => parseFloat(b.wpm) - parseFloat(a.wpm));

  // Trim to top 20
  if (snippet.highScores.length > 20) {
    snippet.highScores = snippet.highScores.slice(0, 20);
  }

  await snippet.save();

  // return newMatch;
});
