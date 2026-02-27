"use client";

import { useCallback, useEffect, useState } from "react";

import { tokenStore } from "@/app/settings/src/lib/token-store";

export function useAuthStatus() {
  const [isReady, setIsReady] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const refreshAuth = useCallback(() => {
    setIsLoggedIn(Boolean(tokenStore.getAccess()));
    setIsReady(true);
  }, []);

  useEffect(() => {
    refreshAuth();
  }, [refreshAuth]);

  return { isReady, isLoggedIn, refreshAuth };
}
