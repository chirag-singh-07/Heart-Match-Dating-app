import { useAuthStore } from "@/store/authStore";
import { Navigate } from "react-router-dom";


const ProtectedGuard = ({ children }) => {
  const { isLoggedIn } = useAuthStore();



  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedGuard;
