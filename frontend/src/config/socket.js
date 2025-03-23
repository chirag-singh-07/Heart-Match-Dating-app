import { io as clientIO } from "socket.io-client";

export const io = clientIO("http://localhost:8000");

io.on("connect", () => {
  // console.log("Connected to socket.io");
});

io.on("new_notification", () => {
  // console.log("New Notification:", data);
});

io.on("sendMessage", () => {
  // console.log("New Message:", data);
});

io.on("newConversation", () => {
  // console.log("New Message:", data);
});

io.on("connect_error", (err) => {
  console.error("Socket connection error:", err);
});
