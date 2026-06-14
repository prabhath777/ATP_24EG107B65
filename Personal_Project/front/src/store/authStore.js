import { create } from "zustand";
import {
  loginUserApi,
  loginOrgApi,
  getMeApi,
  logoutApi,
} from "../services/authApi";

export const useAuthStore = create((set, get) => ({
  user: null,
  token: localStorage.getItem("token") || null,
  role: localStorage.getItem("role") || null,
  loading: true,

  loginUser: async (phone, password) => {
    try {
      const data = await loginUserApi({ phone, password });
      const token = data.token;
      localStorage.setItem("token", token);
      localStorage.setItem("role", "USER");
      
      // Fetch details
      const meData = await getMeApi();
      const userDetails = meData.payload;
      
      set({
        token,
        role: "USER",
        user: userDetails,
        loading: false,
      });
      return { success: true };
    } catch (error) {
      console.error("User login failed", error);
      return {
        success: false,
        message: error.response?.data?.message || "Login failed",
      };
    }
  },

  loginOrg: async (email, password) => {
    try {
      const data = await loginOrgApi({ email, password });
      const token = data.token;
      localStorage.setItem("token", token);
      localStorage.setItem("role", "ORG");

      // Fetch details
      const meData = await getMeApi();
      const orgDetails = meData.payload;

      set({
        token,
        role: "ORG",
        user: orgDetails,
        loading: false,
      });
      return { success: true };
    } catch (error) {
      console.error("Org login failed", error);
      return {
        success: false,
        message: error.response?.data?.message || "Login failed",
      };
    }
  },

  logout: async () => {
    try {
      await logoutApi();
    } catch (e) {
      console.warn("Logout request failed, cleaning up local state anyway", e);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      set({
        user: null,
        token: null,
        role: null,
        loading: false,
      });
    }
  },

  checkAuth: async () => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    
    if (!token) {
      set({ user: null, token: null, role: null, loading: false });
      return;
    }

    try {
      const meData = await getMeApi();
      const userDetails = meData.payload;
      // Infer role based on payload details if role is not in localStorage or needs confirmation
      const inferredRole = userDetails?.orgName ? "ORG" : "USER";

      set({
        user: userDetails,
        token,
        role: inferredRole,
        loading: false,
      });
      localStorage.setItem("role", inferredRole);
    } catch (error) {
      console.error("Session restoration failed", error);
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      set({
        user: null,
        token: null,
        role: null,
        loading: false,
      });
    }
  },

  setUser: (updatedUser) => {
    set({ user: updatedUser });
  }
}));
