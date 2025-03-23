import { useSocketContext } from "@/contexts/SocketContext";
import { useMessageStore } from "@/store/messageStore";
import { Loader, Send } from "lucide-react";
import { useState } from "react";

const MessageInput = () => {
  const { selectedConversation, sendMessage, isLoading } = useMessageStore();
  const [text, setText] = useState("");
  const { socket } = useSocketContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (text.trim()) {
      await sendMessage(selectedConversation?._id, text, socket);
    }
    setText("");
  };
  return (
    <form
      // className="px-4 my-3"
      className="absolute  bottom-0 left-0 right-0 bg-rose-600/20 px-4 py-2 border-t border-rose-400"
      onSubmit={handleSubmit}
    >
      <div className="w-full relative">
        <input
          type="text"
          placeholder="Type a message..."
          name="message"
          id="message"
          className="border text-sm rounded-lg block w-full p-2.5 bg-pink-400 text-white border-rose-500 outline-none placeholder:text-white"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          className="absolute inset-y-0 end-0 flex items-center px-3"
          type="submit"
        >
          {isLoading ? <Loader className="text-lg animate-spin" /> : <Send />}
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
