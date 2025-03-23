import MessagesContainer from "@/components/chats/MessagesContainer";
import Sidebar from "@/components/chats/Sidebar";
import React from "react";

const MessagePage = () => {
  return (
    <div className="flex items-center h-screen overflow-hidden bg-gradient-to-r from-rose-600 to-fuchsia-400">
      <div className="flex sm:h-[550px] md:h-[680px] w-[80%] max-w-4xl mx-auto rounded-lg overflow-hidden bg-white/60 backdrop-blur-lg border border-white/40 shadow-lg">
        {/* Sidebar Component */}
        <Sidebar />

        {/* MessagesContainer Component */}
        <div className="flex-1 flex flex-col">
          <MessagesContainer />
        </div>
      </div>
    </div>
  );
};

export default MessagePage;
