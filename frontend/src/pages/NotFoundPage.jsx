import { Heart } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-pink-50 text-center">
      <Heart className="h-16 w-16 text-rose-500 animate-bounce" />
      <h1 className="text-4xl font-bold text-rose-600 mt-4">404 - Not Found</h1>
      <p className="text-lg text-gray-600 mt-2">
        Oops! Looks like you haven’t matched with this page. 💔
      </p>
      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-rose-500 text-white font-semibold rounded-lg shadow-lg hover:bg-rose-600 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
