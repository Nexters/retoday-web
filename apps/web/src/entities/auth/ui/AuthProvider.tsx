"use client";

import {
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { clientTokenStore } from "@/entities/auth/model/client-token-store";

import { AuthContext, type AuthValue } from "./auth-context";

type AuthProviderProps = {
  children: ReactNode;
  initialIsLoggedIn?: boolean;
};

const AuthProvider = ({
  children,
  initialIsLoggedIn = false,
}: AuthProviderProps) => {
  const [isReady, setIsReady] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(initialIsLoggedIn);

  const refreshAuth = useCallback(async () => {
    try {
      setIsLoggedIn(Boolean(clientTokenStore.getRefresh()));
    } catch {
      setIsLoggedIn(false);
    } finally {
      setIsReady(true);
    }
  }, []);

  const unLogin = useCallback(async () => {
    clientTokenStore.clear();
    setIsLoggedIn(false);
  }, []);

  useEffect(() => {
    refreshAuth();
  }, [refreshAuth]);

  const login = () => {
    setIsLoggedIn(true);
  };

  const value = useMemo<AuthValue>(
    () => ({ isReady, isLoggedIn, refreshAuth, unLogin, login }),
    [isReady, isLoggedIn, refreshAuth, unLogin],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
