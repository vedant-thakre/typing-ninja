// migrations/addDailyStats.js
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import { User } from "../src/models/user.model.js";

await mongoose.connect(process.env.MONGO_URI);

const result = await User.updateMany(
  { dailyStats: { $exists: false } },
  {
    $set: {
      dailyStats: {
        matchesPlayed: 0,
        lastUpdated: new Date(),
      },
    },
  },
);

console.log(`✅ Updated ${result.modifiedCount} users with daily stats`);
process.exit();
