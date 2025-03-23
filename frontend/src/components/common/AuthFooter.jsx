import { Heart } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const AuthFooter = () => {
  return (
    <footer className="w-full border-t bg-background py-6 md:py-12">
      <div className="container flex flex-col items-center justify-center gap-4 px-4 md:px-6 md:flex-row md:justify-between">
        <div className="flex items-center gap-2">
          <Heart className="h-6 w-6 text-rose-500" />
          <span className="text-xl font-bold">HeartMatch</span>
        </div>
        <div className="flex items-center gap-4">
          <Link
            to={"/privacy-policy"}
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Privacy Policy
          </Link>
          <Link
            to={"/terms-and-conditions"}
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Terms of Service
          </Link>
        </div>
      </div>
      <div className="container mt-4 text-center text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} HeartMatch. All rights reserved.
      </div>
    </footer>
  );
};

export default AuthFooter;
