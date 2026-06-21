import {
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { MESSAGE_TYPE } from "@/entities/history/model/messages.type";
import useBrowserMessage from "@/shared/lib/browser/use-browser-message";
import { tokenStore } from "@/shared/lib/token-store";

import { AuthContext, type AuthValue } from "./auth-context";

type AuthProviderProps = {
  children: ReactNode;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isReady, setIsReady] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const refreshAuth = useCallback(async () => {
    try {
      const accessToken = await tokenStore.getAccess();
      setIsLoggedIn(accessToken !== null);
    } catch {
      setIsLoggedIn(false);
    } finally {
      setIsReady(true);
    }
  }, []);

  const logout = useCallback(() => {
    void tokenStore.clear();
    setIsLoggedIn(false);
  }, []);

  useEffect(() => {
    void refreshAuth();
  }, [refreshAuth]);

  useBrowserMessage(MESSAGE_TYPE.AUTH_CHANGED, () => {
    void refreshAuth();
  });

  const value = useMemo<AuthValue>(
    () => ({ isReady, isLoggedIn, refreshAuth, logout }),
    [isReady, isLoggedIn, refreshAuth, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
