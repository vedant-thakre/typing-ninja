import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import { Snippet } from "../src/models/snippet.model.js";

await mongoose.connect(process.env.MONGO_URI);
console.log("✅ Connected to MongoDB");

// Get a few sample snippets to inspect their actual structure
const samples = await Snippet.find({
  highScores: { $exists: true, $ne: [] },
}).limit(5);

console.log("\n=== INSPECTING SAMPLE SNIPPETS ===");

samples.forEach((snippet, index) => {
  console.log(`\n--- Snippet ${index + 1}: ${snippet._id} ---`);
  console.log(`Title: ${snippet.title}`);
  console.log(`High scores count: ${snippet.highScores.length}`);

  snippet.highScores.forEach((score, scoreIndex) => {
    console.log(`\n  Score ${scoreIndex + 1}:`);
    console.log(`    Type: ${typeof score}`);
    console.log(`    Is object: ${typeof score === "object"}`);

    // Check what properties exist
    const props = Object.keys(score._doc || score);
    console.log(`    Properties: ${props.join(", ")}`);

    // Check specific properties
    console.log(`    Has 'username': ${"username" in (score._doc || score)}`);
    console.log(`    Has 'user': ${"user" in (score._doc || score)}`);

    if ("username" in (score._doc || score)) {
      console.log(`    username value: ${score.username}`);
      console.log(`    username type: ${typeof score.username}`);
    }

    if ("user" in (score._doc || score)) {
      console.log(`    user value: ${score.user}`);
      console.log(`    user type: ${typeof score.user}`);
    }

    // Log the full object
    console.log(
      `    Full object:`,
      JSON.stringify(score._doc || score, null, 2),
    );
  });
});

// Also check what query actually returns
console.log("\n=== CHECKING QUERY FILTER ===");
const withUsername = await Snippet.countDocuments({
  "highScores.username": { $exists: true },
});
console.log(`Snippets where highScores.username exists: ${withUsername}`);

const withUser = await Snippet.countDocuments({
  "highScores.user": { $exists: true },
});
console.log(`Snippets where highScores.user exists: ${withUser}`);

const withBoth = await Snippet.countDocuments({
  $or: [
    { "highScores.username": { $exists: true } },
    { "highScores.user": { $exists: true } },
  ],
});
console.log(`Snippets with either username or user field: ${withBoth}`);

process.exit();
