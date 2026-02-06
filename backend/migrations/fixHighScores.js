import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import { Snippet } from "../src/models/snippet.model.js";
import { User } from "../src/models/user.model.js";

await mongoose.connect(process.env.MONGO_URI);
console.log("✅ Connected to MongoDB");

// Use .lean() to get plain JavaScript objects, not Mongoose documents
const snippets = await Snippet.find({
  "highScores.username": { $exists: true },
}).lean(); // ← CRITICAL: Add .lean() here

console.log(`🔍 Found ${snippets.length} snippets to process`);

let updatedCount = 0;
let errorCount = 0;

for (const snippet of snippets) {
  try {
    console.log(`\n📝 Processing snippet: ${snippet._id}`);
    console.log(`   Title: ${snippet.title}`);
    console.log(`   High scores count: ${snippet.highScores?.length || 0}`);

    const updatedHighScores = [];
    let needsUpdate = false;

    for (let i = 0; i < snippet.highScores.length; i++) {
      const score = snippet.highScores[i];

      // Convert to plain object to be sure
      const scoreObj = { ...score };
      console.log(
        `   Score ${i + 1}: username = "${scoreObj.username}", type = ${typeof scoreObj.username}`,
      );

      // Check if username exists and user doesn't
      if (
        scoreObj.username &&
        typeof scoreObj.username === "string" &&
        !scoreObj.user
      ) {
        console.log(`   🔍 Looking up user: ${scoreObj.username}`);
        const user = await User.findOne({ username: scoreObj.username });

        if (!user) {
          console.log(`   ❌ User not found: ${scoreObj.username}`);
          errorCount++;
          // Skip this score or keep it with null user?
          continue;
        }

        console.log(`   ✅ Found user ID: ${user._id}`);

        // Create updated score object
        updatedHighScores.push({
          user: user._id,
          wpm: Number(scoreObj.wpm),
          createdAt: scoreObj.createdAt || new Date(),
          // Don't include _id unless you want to preserve it
        });

        needsUpdate = true;
      } else if (scoreObj.user) {
        // Already has user field, keep it
        console.log(`   ✓ Already has user field`);
        updatedHighScores.push(scoreObj);
      } else {
        // No username or user, skip or handle differently
        console.log(`   ⚠️  No username or user found, skipping`);
      }
    }

    if (needsUpdate && updatedHighScores.length > 0) {
      // Update the document using findByIdAndUpdate
      await Snippet.findByIdAndUpdate(
        snippet._id,
        { $set: { highScores: updatedHighScores } },
        { runValidators: true },
      );

      console.log(
        `   ✅ Updated snippet with ${updatedHighScores.length} scores`,
      );
      updatedCount++;
    } else {
      console.log(`   ⏭️  No updates needed`);
    }
  } catch (error) {
    console.error(
      `   ❌ Error processing snippet ${snippet._id}:`,
      error.message,
    );
    errorCount++;
  }
}

console.log("\n🎉 Migration complete!");
console.log(`📊 Summary:`);
console.log(`   Total snippets processed: ${snippets.length}`);
console.log(`   Snippets updated: ${updatedCount}`);
console.log(`   Errors: ${errorCount}`);

process.exit();
