import {
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useQueryClient } from "@recap/react-query";

import { tokenStore } from "@/entities/auth/model/token-store";
import { MESSAGE_TYPE } from "@/entities/history/model/messages.type";
import useLanguage from "@/entities/language/model/use-language";
import { userProfileQueryOptions } from "@/features/setting/api/user-query";
import useBrowserMessage from "@/shared/lib/browser/use-browser-message";

import { AuthContext, type AuthValue } from "./auth-context";
import { useAuth } from "./use-auth";

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthChangedEffects = () => {
  const { refreshAuth } = useAuth();
  const queryClient = useQueryClient();
  const { patchLanguage } = useLanguage();

  const handleAuthChanged = useCallback(async () => {
    await patchLanguage();
    await queryClient.fetchQuery(userProfileQueryOptions());
    await refreshAuth();
  }, [patchLanguage, queryClient, refreshAuth]);

  const onAuthChanged = useCallback(() => {
    handleAuthChanged();
  }, [handleAuthChanged]);

  useBrowserMessage(MESSAGE_TYPE.AUTH_CHANGED, onAuthChanged);

  return null;
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

  const value = useMemo<AuthValue>(
    () => ({ isReady, isLoggedIn, refreshAuth, unLogin, login }),
    [isReady, isLoggedIn, refreshAuth, unLogin, login],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
