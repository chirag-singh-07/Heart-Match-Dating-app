import { useAuthStore } from "@/store/authStore";
import { Navigate } from "react-router-dom";

const GuestGuard = ({ children }) => {
  const { isLoggedIn } = useAuthStore();

  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default GuestGuard;
