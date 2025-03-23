import { useAuthStore } from "@/store/authStore";
import { Home, LogOut, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const BottomBar = () => {
  const navigate = useNavigate();
  const { logoutUser } = useAuthStore();

  const handleLogout = () => {
    logoutUser(navigate);
  };

  return (
    <div className="mt-auto rounded-full w-full backdrop-blur-lg border-t border-gray-200  py-2">
      <div className="flex justify-around items-center">
        {/* Home Icon */}
        <Link
          to="/"
          className="flex flex-col items-center text-gray-600 hover:text-rose-500 transition"
        >
          <Home className="h-6 w-6" />
          <span className="text-xs">Home</span>
        </Link>

        {/* User Icon */}
        <Link
          to="/profile"
          className="flex flex-col items-center text-gray-600 hover:text-rose-500 transition"
        >
          <User className="h-6 w-6" />
          <span className="text-xs">Profile</span>
        </Link>

        {/* Logout Icon */}
        <button
          onClick={handleLogout}
          className="flex flex-col items-center text-gray-600 hover:text-rose-500 transition"
        >
          <LogOut className="h-6 w-6" />
          <span className="text-xs">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default BottomBar;
