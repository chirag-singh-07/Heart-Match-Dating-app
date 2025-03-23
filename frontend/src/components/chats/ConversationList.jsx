import React, { useEffect, useState } from "react";
import ChatsToEach from "./ChatsToEach";
import { useMessageStore } from "@/store/messageStore";
import { Skeleton } from "../ui/skeleton";
import { motion } from "framer-motion";
import { ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/outline";
// import { useSocketContext } from "@/contexts/SocketContext";

const ConversationList = () => {
  const { fetchConversations, conversations } = useMessageStore();
  const [isLoading, setIsLoading] = useState(false);
  // const { onlineUsers } = useSocketContext();
  // const isOnline = onlineUsers.includes(conversations);

  useEffect(() => {
    setIsLoading(true);
    fetchConversations();
    setIsLoading(false);
  }, [fetchConversations]);
  // console.log("users", isOnline);
  return (
    <div className="py-2 flex flex-col overflow-y-auto scrollbar-hide">
      {isLoading && (
        <>
          <div className="flex items-center space-x-4 mt-4 mb-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
          <div className="flex items-center space-x-4 mt-4 mb-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
          <div className="flex items-center space-x-4 mt-4 mb-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>{" "}
          <div className="flex items-center space-x-4 mt-4 mb-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        </>
      )}
      {conversations && conversations.length > 0
        ? conversations.map((conversation, idx) => (
            <motion.div
              key={conversation._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.1 }}
            >
              <ChatsToEach
                conversation={conversation}
                lastIndex={idx === conversations.length - 1}
              />
            </motion.div>
          ))
        : !isLoading && (
            <>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="flex flex-col items-center justify-center h-96 text-center"
              >
                <ChatBubbleBottomCenterTextIcon className="w-16 h-16 text-rose-500 mb-4 animate-bounce" />
                <h2 className="text-2xl font-bold text-gray-800">
                  No Conversations Yet!
                </h2>
                <p className="text-gray-500 mt-2">
                  Start a conversation and connect with people.
                </p>
              </motion.div>
            </>
          )}
    </div>
  );
};

export default ConversationList;
