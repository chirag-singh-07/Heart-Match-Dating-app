import { useAuthStore } from "@/store/authStore";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const socketRef = useRef(null); // ✅ Use ref to prevent re-renders
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { user } = useAuthStore();

  useEffect(() => {
    if (user && !socketRef.current) {
      socketRef.current = io("http://localhost:8000", {
        withCredentials: true,
        query: {
          userId: user?._id,
        },
      });

      socketRef.current.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });

      return () => {
        if (socketRef.current) {
          socketRef.current.close();
          socketRef.current = null; // ✅ Prevent re-creation loop
        }
      };
    }
  }, [user]);

  return (
    <SocketContext.Provider value={{ socket: socketRef.current, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
