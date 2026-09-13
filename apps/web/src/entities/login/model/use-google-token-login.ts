"use client";

import { useEffect, useMemo, useState } from "react";
import { catchAPIError } from "@recap/api";
import { useQueryClient } from "@recap/react-query";

import { authUnTokenAPIService } from "@/entities/auth/api/auth-un-token-api";
import {
  ensureGoogleGisLoaded,
  requestGoogleAccessToken,
} from "@/entities/auth/lib/request-google-access-token";
import { clientTokenStore } from "@/entities/auth/model/client-token-store";
import { useAuth } from "@/entities/auth/ui";
import useLanguage from "@/entities/language/model/use-language";
import { userProfileQueryOptions } from "@/features/settings/api/user-query.client";
import { useAnalytics } from "@/shared/lib/analytics";

type UseGoogleTokenLoginOptions = {
  onLoginSuccess?: () => void | Promise<void>;
};

export function useGoogleTokenLogin(options?: UseGoogleTokenLoginOptions) {
  const { onLoginSuccess } = options ?? {};
  const queryClient = useQueryClient();
  const { track } = useAnalytics();
  const { login: loginAuth } = useAuth();
  const { patchLanguage } = useLanguage();

  const [ready, setReady] = useState(false);

  const clientId = useMemo(
    () => process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? "",
    [],
  );

  const login = async (oAuthToken?: string) => {
    try {
      const googleAccessToken =
        oAuthToken ?? (await requestGoogleAccessToken());

      const tokens = await authUnTokenAPIService.googleOauthLogin({
        oAuthToken: googleAccessToken,
        socialProvider: "GOOGLE",
      });

      loginAuth();

      clientTokenStore.set({
        ...tokens,
        oAuthToken: googleAccessToken,
      });

      await patchLanguage();

      track("login", { method: "google" });

      await queryClient.fetchQuery(userProfileQueryOptions());

      await onLoginSuccess?.();
    } catch (e: unknown) {
      catchAPIError(e);
      track("web_error", {
        where: "google_token_login",
        message: e instanceof Error ? e.message : undefined,
      });
      throw e;
    }
  };

  useEffect(() => {
    if (!clientId) return;

    ensureGoogleGisLoaded()
      .then(() => setReady(true))
      .catch(() => setReady(false));
  }, [clientId]);

  return { ready, login };
}
