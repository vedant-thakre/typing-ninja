// models/snippet.js
import mongoose from "mongoose";

const snippetSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      default: "easy",
    },
    highScores: [
      {
        username: { type: String, required: true },
        wpm: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    status: {
      type: String,
      enum: ["pending", "approved"],
      default: "pending",
    },
    author: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Snippet = mongoose.model("Snippet", snippetSchema);
