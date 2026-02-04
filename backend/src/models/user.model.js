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
      default: null,
    },
    avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/dmjiwn6qy/image/upload/v1745820072/avatars/xpil1tk43cmntsahlxro.png",
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
    refreshToken: {
      type: String,
    },
    otp: {
      type: Number,
      default: null,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    dailyGoal: {
      type: Number,
      default: 5,
    },
    friends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    requests: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  },
);

userSchema.index({ matchCount: -1 });

export const User = model("User", userSchema);
