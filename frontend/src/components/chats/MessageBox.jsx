import React, { useEffect, useRef, useState } from "react";
import MessageItem from "./MessageItem";
import { useMessageStore } from "@/store/messageStore";
import NotChatSelectedBx from "./NotChatSelectedBx";
import LoadingMessage from "./LoadingMessage";
import { useSocketContext } from "@/contexts/SocketContext";

const MessageBox = () => {
  const { selectedConversation, fetchMessages, messages, listenForMessages } =
    useMessageStore();
  const [isLoading, setIsLoading] = useState(false);
  const lastMessageRef = useRef();
  const { socket } = useSocketContext();
  // const messages = [];
  useEffect(() => {
    const loadMessages = async () => {
      setIsLoading(true);
      await fetchMessages(selectedConversation?._id);
      setIsLoading(false);
    };

    if (selectedConversation?._id) {
      loadMessages();
    }
  }, [fetchMessages, selectedConversation?._id]);

  useEffect(() => {
    console.log("✅ useEffect triggered for listenForMessages");

    if (socket) {
      console.log("✅ Socket is available", socket);

      const cleanup = listenForMessages(socket); // ✅ Check if function runs
      console.log("✅ listenForMessages function executed");

      return cleanup;
    } else {
      console.log("❌ No socket instance found!");
    }
  }, [listenForMessages, socket]);

  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(() => {
        lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    }
  }, [messages]);

  if (!selectedConversation) {
    return <NotChatSelectedBx />;
  }

  // console.log("message", messages);

  return (
    <div className="px-4 flex-1 overflow-auto mb-10">
      {isLoading ? (
        <LoadingMessage />
      ) : messages?.length > 0 ? (
        messages.map((message) => (
          <div key={message?._id} ref={lastMessageRef}>
            <MessageItem message={message} />
          </div>
        ))
      ) : (
        <div className="flex flex-col items-center justify-center h-full text-center mt-4">
          {/* Chat Icon */}
          <div className="p-4 bg-rose-100 rounded-full shadow-lg animate-bounce">
            <svg
              className="w-12 h-12 text-rose-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 3C6.48 3 2 6.58 2 11c0 2.08.93 3.97 2.47 5.38-.11.82-.64 2.62-2.47 4.62 1.5-.5 3.07-1.12 4.45-1.94C9.26 20.31 10.6 21 12 21c5.52 0 10-3.58 10-8s-4.48-8-10-8zm0 14c-1.5 0-2.92-.47-4.09-1.25-.25-.17-.55-.31-.87-.45-.5-.21-1.05-.45-1.55-.73-.19-.11-.37-.22-.54-.35-.47-.34-.9-.72-1.24-1.12-.33-.39-.61-.83-.79-1.29C3.02 12.55 3 12.28 3 12c0-3.87 4.03-7 9-7s9 3.13 9 7-4.03 7-9 7z" />
            </svg>
          </div>

          {/* Message */}
          <p className="text-rose-500 font-semibold text-lg mt-2">
            No messages yet
          </p>
          <p className="text-gray-400 text-sm mt-1">
            Start the conversation and make a new connection! ❤️
          </p>

          {/* Send Message Button */}
          <button className="mt-4 px-4 py-2 bg-rose-500 text-white font-medium rounded-full shadow-lg hover:bg-rose-600 transition">
            Send a Message
          </button>
        </div>
      )}
    </div>
  );
};

export default MessageBox;
