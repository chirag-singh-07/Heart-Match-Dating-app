import { Heart } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const AuthHeader = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link
        to={"/"}
        className="flex items-center gap-2 cursor-pointer">
          <Heart className="h-6 w-6 text-rose-500" />
          <span className="text-xl font-bold">HeartMatch</span>
        </Link>
      </div>
    </header>
  );
};

export default AuthHeader;
