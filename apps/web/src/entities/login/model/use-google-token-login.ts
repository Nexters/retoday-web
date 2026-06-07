"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { catchAPIError } from "@recap/api";

import { loginWithOAuth } from "@/entities/auth/api/auth-session-client";
import { useAnalytics } from "@/shared/lib/analytics";

type UseGoogleTokenLoginOptions = {
  onLoginSuccess?: () => void | Promise<void>;
};

export function useGoogleTokenLogin(options?: UseGoogleTokenLoginOptions) {
  const { onLoginSuccess } = options ?? {};
  const { track } = useAnalytics();

  const [ready, setReady] = useState(false);

  const tokenClientRef = useRef<ReturnType<
    NonNullable<
      NonNullable<NonNullable<Window["google"]>["accounts"]>["oauth2"]
    >["initTokenClient"]
  > | null>(null);

  const clientId = useMemo(
    () => process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? "",
    [],
  );

  const login = () => {
    if (!tokenClientRef.current) return;
    tokenClientRef.current.requestAccessToken({ prompt: "consent" });
  };

  useEffect(() => {
    if (!clientId) return;

    const existing = document.querySelector<HTMLScriptElement>(
      'script[data-google-gis="true"]',
    );

    const init = () => {
      const google = window.google;
      if (!google?.accounts?.oauth2?.initTokenClient) return;

      tokenClientRef.current = google.accounts.oauth2.initTokenClient({
        client_id: clientId,
        scope: "openid email profile",
        callback: async (resp) => {
          try {
            if (resp.error) {
              throw new Error(
                `Google error: ${resp.error} ${resp.error_description ?? ""}`.trim(),
              );
            }

            const googleAccessToken = resp.access_token;
            if (!googleAccessToken)
              throw new Error("Google access_token이 없어요.");

            await loginWithOAuth({
              oAuthToken: googleAccessToken,
              provider: "GOOGLE",
            });

            track("login", { method: "google" });
            await onLoginSuccess?.();
          } catch (e: unknown) {
            catchAPIError(e);
            track("web_error", {
              where: "google_token_login",
              message: e instanceof Error ? e.message : undefined,
            });
          }
        },
      });

      setReady(true);
    };

    if (existing) {
      init();
      return;
    }

    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.dataset.googleGis = "true";

    script.onload = init;
    script.onerror = () => {
      setReady(false);
    };

    document.head.appendChild(script);
  }, [clientId, onLoginSuccess, track]);

  return { ready, login };
}
