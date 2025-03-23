import { Heart, Loader2 } from "lucide-react";
import React from "react";
import { motion } from "framer-motion";
const LoadingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-rose-50 to-rose-100 text-rose-700">
      {/* Animated Heart Icon */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0.5 }}
        animate={{ scale: 1.2, opacity: 1 }}
        transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
        className="p-4 rounded-full bg-white shadow-lg"
      >
        <Heart className="h-12 w-12 text-rose-500" />
      </motion.div>

      {/* Loading Text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
        className="mt-4 text-lg font-semibold"
      >
        Finding your perfect match...
      </motion.p>

      {/* Spinning Loader */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="mt-4"
      >
        <Loader2 className="h-8 w-8 text-rose-500 animate-spin" />
      </motion.div>
    </div>
  );
};

export default LoadingPage;
