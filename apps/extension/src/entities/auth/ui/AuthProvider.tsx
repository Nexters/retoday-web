import {
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { tokenStore } from "@/entities/auth/model/token-store";
import { MESSAGE_TYPE } from "@/entities/history/model/messages.type";
import useBrowserMessage from "@/shared/lib/browser/use-browser-message";

import { AuthContext, type AuthValue } from "./auth-context";

type AuthProviderProps = {
  children: ReactNode;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isReady, setIsReady] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const refreshAuth = useCallback(async () => {
    try {
      setIsLoggedIn(Boolean(await tokenStore.getRefresh()));
    } catch {
      setIsLoggedIn(false);
    } finally {
      setIsReady(true);
    }
  }, []);

  const unLogin = useCallback(async () => {
    await tokenStore.clear();
    setIsLoggedIn(false);
  }, []);

  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  useEffect(() => {
    refreshAuth();
  }, [refreshAuth]);

  useBrowserMessage(MESSAGE_TYPE.AUTH_CHANGED, () => {
    refreshAuth();
  });

  const value = useMemo<AuthValue>(
    () => ({ isReady, isLoggedIn, refreshAuth, unLogin, login }),
    [isReady, isLoggedIn, refreshAuth, unLogin, login],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
