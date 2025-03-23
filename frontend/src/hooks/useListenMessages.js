import { useSocketContext } from "@/contexts/SocketContext";
import { useEffect, useState } from "react";
// import React, { useEffect } from "react";

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const [messages, setMessage] = useState([]);

  useEffect(() => {
    socket.on("receiveMessage", (message) => {
      setMessage((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [socket]);
};

export default useListenMessages;
