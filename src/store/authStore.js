import { create } from "zustand";
import { authAPI } from "../api/auth";

const authStore = create((set) => ({
  user: null,
  token: localStorage.getItem("token"),
  loading: false,

  login: async (data) => {
    set({ loading: true });
    try {
      const res = await authAPI.login(data);

      localStorage.setItem("token", res.data.access);

      set({ token: res.data.access });

      await authStore.getState().getProfile();
    } finally {
      set({ loading: false });
    }
  },

  getProfile: async () => {
    const res = await authAPI.getProfile();
    set({ user: res.data });
  },

  logout: async () => {
    try {
      await authAPI.logout();
    } catch (e) {}

    localStorage.removeItem("token");
    set({ user: null, token: null });
  },
}));

export default authStore;
