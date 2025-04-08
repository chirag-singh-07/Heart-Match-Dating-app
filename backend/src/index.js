import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import AuthRoutes from "./routes/AuthRoutes.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import UserRoutes from "./routes/UserRoutes.js";
import MessageRoutes from "./routes/MessageRoutes.js";
import { Server } from "socket.io";
import http from "http";
import { EventEmitter } from "events";
import { app, io, server } from "./lib/socket.js";

dotenv.config();
EventEmitter.defaultMaxListeners = 200;

const PORT = process.env.PORT || 5000;

connectDB();
app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

io.setMaxListeners(200);

app.use(cookieParser());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/auth", AuthRoutes);
app.use("/api/users", UserRoutes);
app.use("/api/messages", MessageRoutes);

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
