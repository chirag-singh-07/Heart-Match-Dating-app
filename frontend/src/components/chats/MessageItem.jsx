import { useAuthStore } from "@/store/authStore";
import { useMessageStore } from "@/store/messageStore";
import React from "react";

const MessageItem = ({ message }) => {
  const { user } = useAuthStore();
  const { selectedConversation } = useMessageStore();

  // ✅ Fix sender and receiver check
  const isSender = message?.senderId?._id === user?._id;
  const formattedTime = new Date(message?.createdAt).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  // ✅ Fix profilePic for incoming messages
  const profilePic = isSender
    ? user?.profileImage
    : message?.senderId?.profileImage ||
      selectedConversation?.profileImage ||
      "https://avatar.iran.liara.run/public";

  return (
    <div className={`chat ${isSender ? "chat-end" : "chat-start"} mb-3`}>
      {/* Avatar + Name */}
      <div className="chat-image avatar flex items-center gap-2">
        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-rose-500 shadow-md">
          <img src={profilePic} alt="Profile" />
        </div>
        {/* {!isSender && (
          <span className="text-gray-500 text-xs">
            {message?.senderId?.name || "User"}
          </span>
        )} */}
      </div>

      {/* ✅ Message Bubble */}
      <div
        className={`chat-bubble ${
          isSender
            ? "bg-gradient-to-r from-rose-500 to-pink-500 text-white"
            : "bg-white text-gray-800"
        } px-4 py-2 rounded-lg shadow-md`}
      >
        {message?.message || "No message"}
      </div>

      {/* ✅ Timestamp */}
      <div className="chat-footer opacity-50 text-gray-500 text-xs mt-1">
        {formattedTime}
      </div>
    </div>
  );
};

export default MessageItem;
