import { create } from "zustand";

type AuthState = {
  isLoggedIn: boolean | null;
  setIsLoggedIn: (value: boolean) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: null,
  setIsLoggedIn: (value) => set({ isLoggedIn: value }),
}));
