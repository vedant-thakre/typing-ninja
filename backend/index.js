import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import colors from "colors";
import dotenv from "dotenv";
import axios from "axios";

// Load environment variables
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: process.env.CORS_ORIGIN || "*" },
});




let text =
  "the world is full of endless possibilities where people wake up every day to chase their dreamss"; // Example text

const users = {}; // Keep track of users globally

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`.cyan.bold);

  // Send text on join
  socket.emit("text", text);

  // Track user progress (without setName)
  socket.on("progress", ({ userName, progress }) => {

    if (!users[userName]) {
      users[userName] = { name: userName, progress: 0 }; // Store user if not already added
    }

    users[userName].progress = progress; // Update progress

    io.emit("updateProgress", formatProgressData());
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    Object.keys(users).forEach((key) => {
      if (users[key].name === socket.id) {
        delete users[key];
      }
    });

    io.emit("updateProgress", formatProgressData());
    console.log(`User disconnected: ${socket.id}`.red.bold);
  });

  // Helper function to format progress data
  function formatProgressData() {
    return Object.values(users).reduce((acc, { name, progress }) => {
      acc[name] = progress;
      return acc;
    }, {});
  }
});



// Use environment variable for port
const PORT = process.env.PORT || 4000;
server.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`.yellow.bold)
);
