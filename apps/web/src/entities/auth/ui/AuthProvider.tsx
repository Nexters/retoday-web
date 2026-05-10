"use client";

import {
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { tokenStore } from "@/entities/auth/model/token-store";

import { AuthContext, type AuthValue } from "./auth-context";

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isReady, setIsReady] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const refreshAuth = useCallback(() => {
    setIsLoggedIn(Boolean(tokenStore.getAccess()));
    setIsReady(true);
  }, []);

  useEffect(() => {
    refreshAuth();
  }, [refreshAuth]);

  const value = useMemo<AuthValue>(
    () => ({ isReady, isLoggedIn, refreshAuth }),
    [isReady, isLoggedIn, refreshAuth],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
