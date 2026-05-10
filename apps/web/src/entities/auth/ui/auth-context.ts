"use client";

import { createContext } from "react";

export type AuthValue = {
  isReady: boolean;
  isLoggedIn: boolean;
  refreshAuth: () => void;
};

export const AuthContext = createContext<AuthValue | null>(null);
