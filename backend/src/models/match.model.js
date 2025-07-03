import mongoose from "mongoose";

const matchSchema = new mongoose.Schema(
  {
    mode: { type: String, enum: ["solo", "multiplayer", "duel"], default: "solo" },
    users: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        wpm: String,
        accuracy: String,
        errors: String,
      },
    ],
    snippet: { type: mongoose.Schema.Types.ObjectId, ref: "Snippet" },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const Match = mongoose.model("Match", matchSchema);
