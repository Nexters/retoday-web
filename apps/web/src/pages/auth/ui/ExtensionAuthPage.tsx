"use client";

import { useCallback, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { useAuth } from "@/entities/auth/ui";
import { useGoogleTokenLogin } from "@/entities/login/model/use-google-token-login";

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

  const redirect = searchParams?.get("redirect") ?? null;
  const date = searchParams?.get("date") ?? null;
  const oAuthToken = searchParams?.get("oAuthToken");

  const onLoginSuccess = useCallback(async () => {
    await refreshAuth();
    router.replace(buildRedirectPath(redirect, date));
  }, [date, redirect, refreshAuth, router]);

  const { login } = useGoogleTokenLogin({ onLoginSuccess });

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    void (async () => {
      try {
        if (!oAuthToken) {
          await unLogin();
          router.replace("/analysis");
          return;
        }

        await login(oAuthToken);
      } catch {
        await unLogin();
        router.replace("/analysis");
      }
    })();
  }, [login, oAuthToken, router, unLogin]);

  return (
    <div className="flex min-h-[40vh] items-center justify-center px-4 text-center text-sm text-gray-500">
      Signing in…
    </div>
  );
}
