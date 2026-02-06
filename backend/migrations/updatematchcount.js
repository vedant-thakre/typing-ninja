import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import { User } from "../src/models/user.model.js";
import { Match } from "../src/models/match.model.js";

await mongoose.connect(process.env.MONGO_URI);
console.log("✅ Connected to MongoDB");

const updateUserMatchCounts = async () => {
  try {
    console.log("🔍 Counting matches per user...");

    // Aggregate to count matches per user
    const matchCounts = await Match.aggregate([
      // Unwind the users array to get each user in a match
      { $unwind: "$users" },
      // Group by userId to count matches
      {
        $group: {
          _id: "$users.userId",
          matchCount: { $sum: 1 },
        },
      },
    ]);

    console.log(`📊 Found ${matchCounts.length} users with matches`);

    let updatedCount = 0;
    let errorCount = 0;

    // Update each user's matchCount
    for (const matchCount of matchCounts) {
      try {
        const userId = matchCount._id;

        if (!userId) {
          console.log(`⚠️  Skipping entry with null userId`);
          continue;
        }

        // Update the user's matchCount
        const result = await User.findByIdAndUpdate(
          userId,
          { $set: { matchCount: matchCount.matchCount } },
          { new: true },
        );

        if (result) {
          console.log(
            `✅ Updated ${result.username || result.email}: ${matchCount.matchCount} matches`,
          );
          updatedCount++;
        } else {
          console.log(`❌ User not found: ${userId}`);
          errorCount++;
        }
      } catch (error) {
        console.error(
          `❌ Error updating user ${matchCount._id}:`,
          error.message,
        );
        errorCount++;
      }
    }

    // Also update users with 0 matches (set matchCount to 0)
    console.log("\n🔍 Setting matchCount to 0 for users with no matches...");

    // Get all user IDs that have matches
    const userIdsWithMatches = matchCounts
      .map((mc) => mc._id)
      .filter((id) => id);

    // Update users without matches
    const zeroUpdateResult = await User.updateMany(
      {
        _id: { $nin: userIdsWithMatches },
        matchCount: { $ne: 0, $exists: true }, // Only update if not already 0
      },
      { $set: { matchCount: 0 } },
    );

    console.log(
      `✅ Set matchCount to 0 for ${zeroUpdateResult.modifiedCount} users`,
    );

    console.log("\n🎉 Update complete!");
    console.log(`📊 Summary:`);
    console.log(`   Users with matches updated: ${updatedCount}`);
    console.log(`   Users set to 0 matches: ${zeroUpdateResult.modifiedCount}`);
    console.log(`   Errors: ${errorCount}`);
  } catch (error) {
    console.error("❌ Error in updateUserMatchCounts:", error);
  } finally {
    await mongoose.disconnect();
    process.exit();
  }
};

// Run the update
updateUserMatchCounts();
