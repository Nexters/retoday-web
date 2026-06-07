"use client";

import {
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { fetchSession } from "@/entities/auth/api/auth-session-client";

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
      const session = await fetchSession();
      setIsLoggedIn(session.isLoggedIn);
    } catch {
      setIsLoggedIn(false);
    } finally {
      setIsReady(true);
    }
  }, []);

  useEffect(() => {
    void refreshAuth();
  }, [refreshAuth]);

  const value = useMemo<AuthValue>(
    () => ({ isReady, isLoggedIn, refreshAuth }),
    [isReady, isLoggedIn, refreshAuth],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
