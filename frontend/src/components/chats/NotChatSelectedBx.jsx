import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

const NotChatSelectedBx = () => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center  w-full text-center text-gray-500 mt-60"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Icon with Animation */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.2, 1] }}
        transition={{ duration: 0.5 }}
        className="bg-rose-500 text-white p-4 rounded-full shadow-lg"
      >
        <MessageCircle className="w-12 h-12" />
      </motion.div>

      {/* Message */}
      <p className="mt-4 text-lg font-semibold">No Chat Selected</p>
      <p className="text-gray-400 mt-2">Select a chat to start messaging!</p>
    </motion.div>
  );
};

export default NotChatSelectedBx;
