import { CircleEllipsis, Phone, Video } from "lucide-react";
import React, { useEffect } from "react";
import MessageBox from "./MessageBox";
import MessageInput from "./MessageInput";
import NotChatSelectedBx from "./NotChatSelectedBx";
import { useMessageStore } from "@/store/messageStore";

const MessagesContainer = () => {
  const { selectedConversation, setSelectedConversation } = useMessageStore();
  useEffect(() => {
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  // console.log("selectedConversation", selectedConversation);

  return (
    <div className="md:min-w-[450px] flex flex-col overflow-auto relative h-full ">
      {/* Header Section */}
      {!selectedConversation ? (
        <NotChatSelectedBx />
      ) : (
        <>
          <div className="bg-gradient-to-r from-rose-500 to-fuchsia-500 px-6 py-4 mb-2 flex items-center gap-36 rounded-t-lg shadow-lg">
            {/* User Info */}
            <div className="flex items-center gap-3">
              {/* Avatar */}
              <div className="size-16 overflow-hidden rounded-full border-2 border-white avatar">
                <img
                  src={
                    selectedConversation?.profileImage ||
                    "https://avatar.iran.liara.run/public"
                  }
                  alt="User Avatar"
                  className="size-16 object-cover"
                />
              </div>

              <div className="flex flex-col">
                <span className="text-white font-semibold text-lg">
                  {selectedConversation?.name || "Unknown User"}
                </span>
                <span className="text-sm text-white/70">Active now</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-4">
              <button className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition">
                <Phone className="text-white size-6" />
              </button>
              <button className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition">
                <Video className="text-white size-6" />
              </button>
              <button className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition">
                <CircleEllipsis className="text-white size-6" />
              </button>
            </div>
          </div>

          <MessageBox />
          <MessageInput />
        </>
      )}
    </div>
  );
};

export default MessagesContainer;
