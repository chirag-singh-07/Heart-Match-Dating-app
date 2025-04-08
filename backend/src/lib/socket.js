import { Server } from "socket.io";
import http from "http";
import express from "express";
import dotenv from "dotenv";
const app = express();
const server = http.createServer(app);

dotenv.config();

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    credentials: true,
    methods: ["GET", "POST"],
  },
});

const userSocketMap = {}; // Stores userId → socketId(s)

io.on("connection", (socket) => {
  console.log(`🔌 New client connected: ${socket.id}`);

  // ✅ Get userId from handshake
  const userId = socket.handshake.query.userId;
  if (userId && userId !== "undefined") {
    if (!userSocketMap[userId]) userSocketMap[userId] = [];
    userSocketMap[userId].push(socket.id);
  }

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  // ✅ Join room for private messages
  socket.on("join", (roomId) => {
    if (roomId) {
      socket.join(roomId);
      console.log(`✅ User joined room: ${roomId}`);
    }
  });

  // ✅ Typing event
  socket.on("typing", ({ senderId, receiverId }) => {
    if (senderId && receiverId && userSocketMap[receiverId]) {
      userSocketMap[receiverId].forEach((socketId) => {
        io.to(socketId).emit("userTyping", senderId);
      });
    }
  });

  // ✅ Stop typing event
  socket.on("stopTyping", ({ senderId, receiverId }) => {
    if (senderId && receiverId && userSocketMap[receiverId]) {
      userSocketMap[receiverId].forEach((socketId) => {
        io.to(socketId).emit("userStoppedTyping", senderId);
      });
    }
  });

  // ✅ Send message event
  socket.on("receiveMessage", (data) => {
    const { senderId, receiverId, message } = data;
    console.log("✅ Server received a message:", message);
    if (senderId && receiverId && message) {
      if (userSocketMap[receiverId]) {
        userSocketMap[receiverId].forEach((socketId) => {
          io.to(socketId).emit("receiveMessage", data);
        });
      }
      if (userSocketMap[senderId]) {
        userSocketMap[senderId].forEach((socketId) => {
          io.to(socketId).emit("updateSidebar");
        });
      }
      console.log(`📩 Message sent from ${senderId} to ${receiverId}`);
    }
  });

  // ✅ Like event (Notification)
  socket.on("like", (data) => {
    const { receiverId } = data;
    if (receiverId && userSocketMap[receiverId]) {
      userSocketMap[receiverId].forEach((socketId) => {
        io.to(socketId).emit("new_notification", data);
      });
    }
  });

  // ✅ Handle user disconnect
  socket.on("disconnect", () => {
    console.log(`❌ Client disconnected: ${socket.id}`);

    // ✅ Remove socket from userSocketMap
    for (const userId in userSocketMap) {
      userSocketMap[userId] = userSocketMap[userId].filter(
        (id) => id !== socket.id
      );
      if (userSocketMap[userId].length === 0) {
        delete userSocketMap[userId]; // Remove user if no active sockets
      }
    }

    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export const getReceiverSocketId = (receiverId) => {
  if (userSocketMap[receiverId]) {
    return userSocketMap[receiverId];
  } else {
    console.error(`User with ID ${receiverId} not found`);
    return null;
  }
};

export { app, io, server };
