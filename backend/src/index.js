import express from "express";
import cors from "cors";
import colors from "colors";
import dotenv from "dotenv";
import { app, server } from "./lib/socket.js";
import { connectDB } from "./db/index.js";
import cookieParser from "cookie-parser";

// Routes
import userRoutes from "./routes/user.routes.js";
import postRoutes from "./routes/post.routes.js";
import commentRoutes from "./routes/comment.routes.js";

// Load environment variables
dotenv.config();


app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    // methods: ["GET", "POST", "PUT", "DELETE"],
    // allowedHeaders: ["Content-Type", "Authorization"],
  })
);


// Routes
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);


// Use environment variable for port
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`.yellow.bold);
  connectDB();
});
