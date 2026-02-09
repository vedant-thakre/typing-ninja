// migrations/addIsBannedField.js
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import { User } from "../src/models/user.model.js";

async function runMigration() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // Add isBanned field to users where it doesn't exist, default to false
    const result = await User.updateMany(
      { isBanned: { $exists: false } },
      {
        $set: { isBanned: false },
      },
    );

    console.log(`✅ Added isBanned field to ${result.modifiedCount} users`);

    // Optional: Verify the migration
    const countWithField = await User.countDocuments({
      isBanned: { $exists: true },
    });
    const users = await User.find({ isBanned: false });
    console.log("Total users: ", users.length);
    const totalUsers = await User.countDocuments();
    console.log(`📊 Total users: ${totalUsers}`);
    console.log(`📊 Users with isBanned field: ${countWithField}`);
  } catch (error) {
    console.error("❌ Migration failed:", error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB");
    process.exit(0);
  }
}

runMigration();
