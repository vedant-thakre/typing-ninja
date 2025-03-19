import { model, mongoose } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    username: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
    },
    age: {
      type: Number,
      default: null,
    },
    averageAccuracy: {
      type: Number,
      default: null,
    },
    averageErrors: {
      type: Number,
      default: null,
    },
    averageWpm: {
      type: Number,
      default: null,
    },
    bio: {
      type: String,
      default: null,
    },
    country: {
      type: String,
      default: null,
    },
    gender: {
      type: String,
      default: null,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    matchCount: {
      type: Number,
      default: null,
    },
    posts: {
      type: [],
    },
    recentAverageAccuracy: {
      type: Number,
      default: null,
    },
    recentAverageErrors: {
      type: Number,
      default: null,
    },
    recentAverageWpm: {
      type: Number,
      default: null,
    },
    topWpm: {
      type: Number,
      default: null,
    },
    totalWins: {
      type: Number,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export const User = model("User", userSchema);
