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
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        wpm: {
          type: Number,
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
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
  { timestamps: true },
);

snippetSchema.index({ difficulty: 1 });
snippetSchema.index({ "highScores.user": 1 });

export const Snippet = mongoose.model("Snippet", snippetSchema);
