import { showToast } from "@/config/toastUtils";
import axios from "axios";
import { io } from "socket.io-client";
import { create } from "zustand";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8000/api";
axios.defaults.withCredentials = true;

const socket = io("http://localhost:8000", {
  withCredentials: true,
});

export const useProfileStore = create((set, get) => ({
  allProfiles: [],
  genderProfiles: [],
  notifications: [],
  isLoading: false,
  error: null,

  fetchNotifications: async () => {
    try {
      set({ isLoading: true, error: null });
      const response = await axios.post(`${API_BASE}/users/notifications`);
      set({
        notifications: response.data.data,
        isLoading: false,
      });
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Error fetching notifications";
      showToast("serverError", errorMessage);
      set({ error: errorMessage, isLoading: false });
    }
  },
  setNotification: (data) => {
    set((state) => ({
      notifications: [data, ...state.notifications], 
    }));

  
    showToast("like", data.message);
  },

  connectSocket: (userId) => {
    if (userId) {
      socket.emit("join", userId);

      socket.on("new_notification", (data) => {
        console.log("🔔 New Notification:", data);
        get().setNotification(data); 
      });
    }
  },

  disconnectSocket: () => {
    socket.disconnect();
  },

  fetchProfiles: async () => {
    try {
      set({ isLoading: true, error: null });
      const response = await axios.get(`${API_BASE}/users/all-profiles`);
      set({
        allProfiles: response.data.data,
        isLoading: false,
      });
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Error fetching all profiles";
      showToast("serverError", errorMessage);
      set({ error: errorMessage, isLoading: false });
    }
  },

  // ✅ Fetch Gender-based Profiles
  fetchGenderProfiles: async () => {
    try {
      set({ isLoading: true, error: null });
      const response = await axios.get(`${API_BASE}/users/gender-profiles`);
      set({
        genderProfiles: response.data.data,
        isLoading: false,
      });

      // console.log("ok", response);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Error fetching gender-based profiles";
      showToast("serverError", errorMessage);
      set({ error: errorMessage, isLoading: false });
    }
  },

  // ✅ Like a Profile
  likeUserProfile: async (profileId) => {
    try {
      set({ isLoading: true, error: null });
      const response = await axios.post(`${API_BASE}/users/like`, {
        profileId,
      });
      set({ isLoading: false });
      showToast("like", response.data.message);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Error liking user profile";
      showToast("serverError", errorMessage);
      set({ error: errorMessage, isLoading: false });
    }
  },

  // ✅ Fetch Notifications

  updateUserProfile: async (formData) => {
    try {
      set({ isLoading: true, error: null });
      const response = await axios.post(
        `${API_BASE}/users/update-profile`,
        formData
      );
      set({ isLoading: false });
      showToast("profile", response.data.message);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Error updating user profile";
      showToast("serverError", errorMessage);
      set({ error: errorMessage, isLoading: false });
    }
  },
}));
