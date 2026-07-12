"use client";

import { useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { authUnTokenAPIService } from "@/entities/auth/api";
import { clientTokenStore } from "@/entities/auth/model/client-token-store";
import { useAuth } from "@/entities/auth/ui";

function buildRedirectPath(redirect: string | null, date: string | null) {
  const path = redirect && redirect.startsWith("/") ? redirect : "/analysis";

  if (!date) return path;

  const params = new URLSearchParams({ date });
  return `${path}?${params.toString()}`;
}

export default function ExtensionAuthPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { refreshAuth, unLogin } = useAuth();
  const startedRef = useRef(false);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    const code = searchParams?.get("code");
    const redirect = searchParams?.get("redirect");
    const date = searchParams?.get("date");

    void (async () => {
      try {
        if (!code) {
          await unLogin();
          router.replace("/analysis");
          return;
        }

        clientTokenStore.set({
          accessToken: clientTokenStore.getAccess() ?? "",
          refreshToken: code,
        });

        const tokens = await authUnTokenAPIService.refreshTokens({
          refreshToken: code,
        });

        clientTokenStore.set(tokens);
        await refreshAuth();
        router.replace(buildRedirectPath(redirect ?? null, date ?? null));
      } catch {
        await unLogin();
        router.replace("/analysis");
      }
    })();
  }, [refreshAuth, router, searchParams, unLogin]);

  return (
    <div className="flex min-h-[40vh] items-center justify-center px-4 text-center text-sm text-gray-500">
      Signing in…
    </div>
  );
}
