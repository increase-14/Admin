import { create } from "zustand";
import { persist } from "zustand/middleware";

const authStore = create(
  persist(
    (set) => ({
      access: null,
      refresh: null,
      isAuth: false,

      login: (access, refresh) => {
        localStorage.setItem("token", access);
        set({ access, refresh, isAuth: true });
      },

      logout: () => {
        localStorage.removeItem("token");
        set({ access: null, refresh: null, isAuth: false });
      },
    }),
    { name: "auth-store" }
  )
);

export default authStore;
