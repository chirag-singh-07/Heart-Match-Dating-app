import mongoose from "mongoose";
import Message from "../models/messageModel.js";
import { sendResponse } from "../utils/index.js";
import { getReceiverSocketId, io } from "../lib/socket.js";

export const handleSendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id } = req.params; // receiverId from URL
    const senderId = req.userId; // Ensure this is set in `jwtCheck.js`

    if (!id) {
      return sendResponse(res, false, 400, "Receiver ID is required");
    }

    const receiverId = new mongoose.Types.ObjectId(id);
    const senderObjectId = new mongoose.Types.ObjectId(senderId);

    if (
      !mongoose.Types.ObjectId.isValid(senderObjectId) ||
      !mongoose.Types.ObjectId.isValid(receiverId)
    ) {
      return sendResponse(res, false, 400, "Invalid sender or receiver ID");
    }

    if (senderObjectId.equals(receiverId)) {
      return sendResponse(res, false, 400, "You cannot message yourself");
    }

    // ✅ Store only messages (No need for Conversation model)
    const newMessage = new Message({
      senderId: senderObjectId,
      receiverId: receiverId,
      message,
    });

    await newMessage.save();

    // ✅ Populate sender & receiver data
    const populatedMessage = await newMessage.populate([
      { path: "senderId", select: "name profileImage" },
      { path: "receiverId", select: "name profileImage" },
    ]);

    const receiverSocketId = getReceiverSocketId(receiverId.toString());
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("receiveMessage", populatedMessage);
    }
    // ✅ Emit message to receiver via WebSocket

    return sendResponse(
      res,
      true,
      200,
      "Message sent successfully",
      populatedMessage
    );
  } catch (error) {
    console.error("❌ Error in handleSendMessage:", error);
    return sendResponse(res, false, 500, "Failed to send message");
  }
};

export const handleGetMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params; // The other user's ID
    const senderId = req.userId; // Logged-in user ID

    const { page = 1, limit = 30 } = req.query; // Pagination support

    if (
      !mongoose.Types.ObjectId.isValid(senderId) ||
      !mongoose.Types.ObjectId.isValid(userToChatId)
    ) {
      return sendResponse(res, false, 400, "Invalid sender or receiver ID");
    }

    // ✅ Fetch messages directly without checking for a conversation
    const messages = await Message.find({
      $or: [
        { senderId: senderId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: senderId },
      ],
    })
      .sort({ createdAt: -1 }) // ✅ Get latest messages first
      .skip((page - 1) * limit) // ✅ Pagination offset
      .limit(limit) // ✅ Fetch only `limit` messages at a time
      .populate("senderId", "name profileImage") // Get sender details
      .populate("receiverId", "name profileImage"); // Get receiver details

    // io.to(receiverId.toString()).emit("receiveMessage", populatedMessage);
    return sendResponse(
      res,
      true,
      200,
      "Messages fetched successfully",
      messages.reverse() // ✅ Reverse to keep the correct chat order
    );
  } catch (error) {
    console.error("❌ Error in handleGetMessages:", error);
    return sendResponse(res, false, 500, "Failed to get messages");
  }
};
