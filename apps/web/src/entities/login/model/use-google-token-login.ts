"use client";

import { useEffect, useMemo, useState } from "react";
import { catchAPIError } from "@recap/api";

import { loginWithOAuth } from "@/entities/auth/api/auth-session-client";
import {
  ensureGoogleGisLoaded,
  requestGoogleAccessToken,
} from "@/entities/auth/lib/request-google-access-token";
import { useAnalytics } from "@/shared/lib/analytics";

type UseGoogleTokenLoginOptions = {
  onLoginSuccess?: () => void | Promise<void>;
};

export function useGoogleTokenLogin(options?: UseGoogleTokenLoginOptions) {
  const { onLoginSuccess } = options ?? {};
  const { track } = useAnalytics();

  const [ready, setReady] = useState(false);

  const clientId = useMemo(
    () => process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? "",
    [],
  );

  const login = () => {
    void requestGoogleAccessToken()
      .then(async (googleAccessToken) => {
        await loginWithOAuth({
          oAuthToken: googleAccessToken,
          provider: "GOOGLE",
        });

        track("login", { method: "google" });
        await onLoginSuccess?.();
      })
      .catch((e: unknown) => {
        catchAPIError(e);
        track("web_error", {
          where: "google_token_login",
          message: e instanceof Error ? e.message : undefined,
        });
      });
  };

  useEffect(() => {
    if (!clientId) return;

    void ensureGoogleGisLoaded()
      .then(() => setReady(true))
      .catch(() => setReady(false));
  }, [clientId]);

  return { ready, login };
}
