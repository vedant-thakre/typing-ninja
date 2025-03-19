import express from "express";
import cors from "cors";
import colors from "colors";
import dotenv from "dotenv";
import { app, server } from "./lib/socket.js";
import { connectDB } from "./db/index.js";
import userRoutes from "./routes/user.routes.js";

// Load environment variables
dotenv.config();

app.use(express.json());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

// Routes
app.use("/api/users", userRoutes);

// Use environment variable for port
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`.yellow.bold);
  connectDB();
});
