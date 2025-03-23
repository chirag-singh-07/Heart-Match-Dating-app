import React from "react";
import { Separator } from "../ui/separator";
import { useAuthStore } from "@/store/authStore";
import { useMessageStore } from "@/store/messageStore";
import { useSocketContext } from "@/contexts/SocketContext";


const ChatsToEach = ({ conversation, lastIndex }) => {
  const { selectedConversation, setSelectedConversation } = useMessageStore();
  const { user } = useAuthStore();
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(conversation);

  // if (!conversation || conversation.participants.length < 2) return null;

  const currentUserId = user?._id;
  const otherUser = conversation;
  // console.log("conversation", conversation);

  const lastMessage =
    conversation.messages?.length > 0
      ? conversation.messages[conversation.messages.length - 1]
      : null;

  const isSelected = selectedConversation?._id === conversation?._id;

  console.log("isOnline",isOnline);
  

  return (
    <>
      <div
        className={` ${
          isOnline ? "online" : "offline"
        } flex gap-3 items-center hover:bg-rose-500/10 transition-colors duration-300 rounded-xl p-3 cursor-pointer
          ${isSelected ? "bg-rose-500/20" : ""}
          `}
        onClick={() => setSelectedConversation(conversation)}
      >
        {/* Avatar */}
        <div className="avatar">
          <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-rose-400 shadow-md">
            <img
              src={
                otherUser?.profileImage ||
                "https://avatar.iran.liara.run/public"
              }
              alt="avatar"
              className="object-cover w-full h-full"
            />
          </div>
        </div>

        {/* User Info */}
        <div className="flex flex-col flex-1">
          <div className="flex justify-between items-center">
            {/* Name */}
            <p className="font-semibold text-lg text-rose-600 hover:text-rose-500 transition-colors">
              {otherUser?.name || "Unknown"}
            </p>
            {/* Message Dot */}
            {/* ✅ Unread message count */}
            {conversation?.unreadCount > 0 && (
              <span className="w-5 h-5 bg-rose-500 text-white text-xs flex items-center justify-center rounded-full font-bold">
                {conversation?.unreadCount}
              </span>
            )}
          </div>
          {/* Last Message */}
          {lastMessage ? (
            <p className="text-sm text-gray-500 truncate">
              {lastMessage.senderId?._id === currentUserId ? "You: " : ""}
              {lastMessage.message}
            </p>
          ) : // <p className="text-sm text-gray-500 truncate">No messages yet...</p>
          null}
        </div>
      </div>

      {/* Separator */}
      {/* {lastIndex > 0 ? <Separator /> : null} */}
      <Separator />
    </>
  );
};

export default ChatsToEach;
