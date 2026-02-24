"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { catchAPIError } from "@recap/api";

import { tokenStore } from "@/app/settings/src/lib/token-store";
import { authAPIService } from "@/app/settings/src/service";

type BackendLoginResponse = {
  accessToken: string;
  refreshToken: string;
};

type UseGoogleTokenLoginOptions = {
  onLoginSuccess?: () => void | Promise<void>;
};

export function useGoogleTokenLogin(options?: UseGoogleTokenLoginOptions) {
  const { onLoginSuccess } = options ?? {};

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

            const data = (await authAPIService.googleOauthLogin({
              oAuthToken: googleAccessToken,
              provider: "GOOGLE",
            })) as BackendLoginResponse;

            if (!data?.accessToken || !data?.refreshToken) return;

            tokenStore.set({
              accessToken: data.accessToken,
              refreshToken: data.refreshToken,
            });

            await onLoginSuccess?.();
          } catch (e: unknown) {
            catchAPIError(e);
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
  }, [clientId, onLoginSuccess]);

  return { ready, login };
}
