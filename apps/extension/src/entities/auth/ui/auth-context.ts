import { createContext } from "react";

export type AuthValue = {
  isReady: boolean;
  isLoggedIn: boolean;
  refreshAuth: () => Promise<void>;
  unLogin: () => Promise<void>;
  login: () => void;
};

export const AuthContext = createContext<AuthValue | null>(null);
