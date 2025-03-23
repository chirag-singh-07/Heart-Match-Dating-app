import { create } from "zustand";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8000/api";
axios.defaults.withCredentials = true;

export const useMessageStore = create((set) => ({
  messages: [],
  conversations: [],
  selectedConversation: null,
  isLoading: false,
  error: null,
  setSelectedConversation: (selectedConversation) =>
    set({ selectedConversation }),
  setMessage: (messages) => set({ messages }),

  fetchMessages: async (receiverId) => {
    // console.log("receiverId",receiverId);

    try {
      set({ isLoading: true, error: null });
      const res = await axios.get(`${API_BASE}/messages/${receiverId}`);
      set({ messages: res.data.data });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to fetch messages",
      });
    } finally {
      set({ isLoading: false });
    }
  },

  sendMessage: async (receiverId, message, socket) => {
    try {
      set({ isLoading: true, error: null });
      const res = await axios.post(`${API_BASE}/messages/send/${receiverId}`, {
        message,
      });
      const newMessage = res.data.data;

      // Update state with new message
      set((state) => ({
        messages: [...state.messages, newMessage],
      }));
      if (socket) {
        // Emit to socket
        socket.emit("receiveMessage", newMessage);
        console.log("New Message Received:", message);
      }
    } catch (error) {
      set({ error: error.response?.data?.message || "Failed to send message" });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchConversations: async () => {
    try {
      set({ isLoading: true, error: null });
      const res = await axios.get(`${API_BASE}/users/get-sidebar-users`);
      set({ conversations: res.data.data });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to fetch conversations",
      });
    } finally {
      set({ isLoading: false });
    }
  },

  // ✅ Handle Real-time Updates with Socket.IO
  listenForMessages: (socket) => {
    if (!socket) return;

    socket.on("receiveMessage", (message) => {
      console.log("New Message Received:", message);
      set((state) => ({
        messages: [...state.messages, message],
      }));
    });

    return () => {
      socket.off("receiveMessage");
    };
  },
}));
