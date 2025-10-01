import { create } from "zustand";
import api from "../config/api";

// Initialize state from localStorage
const storedUser = localStorage.getItem("user");
const storedAuth = localStorage.getItem("isAuthenticated") === "true";

export const useAuthStore = create((set) => ({
  user: storedUser ? JSON.parse(storedUser) : null,
  isAuthenticated: storedAuth,
  loading: false,
  error: null,

  // Register
  register: async (data) => {
    set({ loading: true, error: null });
    try {
      const res = await api.post("/users/register", data);
      console.log(res);
    } catch (err) {
      set({
        error:
          err.response?.data?.message || err.message || "Registration Failed",
      });
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  // Login
  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const base64Creds = btoa(`${email}:${password}`);
      localStorage.setItem("auth", base64Creds);

      const res = await api.post("/users/login", { email, password });

      // persist in localStorage
      localStorage.setItem("user", JSON.stringify(res.data));
      localStorage.setItem("isAuthenticated", "true");

      // update store
      set({ user: res.data, isAuthenticated: true });
      console.log(res.data);
    } catch (err) {
      console.log(err);
      if (err.response.status === 401) {
        set({
          error: "Invalid Credentials!",
        });
      }
      throw err;
    } finally {
      set({ loading: false });
    }
  },

  // Logout
  logout: () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("user");
    localStorage.removeItem("isAuthenticated");
    set({ user: null, isAuthenticated: false });
  },

  // Update user details
  updateUser: (newUserDetails) => {
    set((state) => {
      const updatedUser = { ...state.user, ...newUserDetails };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      return { user: updatedUser };
    });
  },

  // Clear error
  clearError: () => {
    set({ error: null });
  },
}));
