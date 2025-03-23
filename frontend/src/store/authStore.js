import { showToast } from "@/config/toastUtils";
import axios from "axios";
import { create } from "zustand";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:8000/api";
axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
  user: null,
  isLoggedIn: false,
  isLoading: false,
  error: null,

  checkAuth: async () => {
    try {
      set({ isLoading: true });
      const response = await axios.get(`${API_BASE}/auth/check-auth`, {
        withCredentials: true,
      });
      set({
        user: response.data.data,
        isLoggedIn: true,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Error checking up";
      set({ isLoading: false, error: errorMessage });
    }
  },

  registerUser: async (formData, navigate) => {
    console.log("formData", formData);
    try {
      set({ isLoading: true, isLoggedIn: false });

      const response = await axios.post(`${API_BASE}/auth/register`, formData);

      set({
        user: response.data.data,
        isLoggedIn: true,
        isLoading: false,
        error: null,
      });

      // console.log("okey", response);

      showToast("register");

      // Redirect after successful registration
      navigate("/"); // Change to the actual page you want
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Error signing up";
      console.log(errorMessage);
      showToast("serverError", errorMessage);
      set({ isLoading: false, error: errorMessage });
      console.error(error);
    }
  },

  loginUser: async (formData, navigate) => {
    try {
      set({ isLoading: true, isLoggedIn: false });

      const response = await axios.post(`${API_BASE}/auth/login`, formData);

      set({
        user: response.data.user,
        isLoggedIn: true,
        isLoading: false,
        error: null,
      });

      showToast("login");

      // Redirect after successful login
      navigate("/"); // Change to the actual page you want
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Error logging in";
      showToast("serverError", errorMessage);
      set({ isLoading: false, error: errorMessage });
    }
  },

  logoutUser: async (navigate) => {
    // Fixed function name
    try {
      set({ isLoading: true });
      await axios.post(`${API_BASE}/auth/logout`);
      set({ user: null, isLoggedIn: false, isLoading: false, error: null });
      showToast("serverError", "Logged out successfully"); // You can use a "logout" type instead
      navigate("/login"); // Change to the actual page you want
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Error logging out";
      showToast("serverError", errorMessage);
      set({ isLoading: false, error: errorMessage });
    }
  },
}));
