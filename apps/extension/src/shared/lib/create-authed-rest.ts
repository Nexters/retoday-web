import type { RestAPIProtocol } from "@recap/api";
import { RestAPI, RestAPIInstance } from "@recap/api";

import { tokenStore } from "@/shared/lib/token-store";

type RefreshResponse = { accessToken: string; refreshToken: string };

let refreshPromise: Promise<RefreshResponse> | null = null;

async function refreshTokens(baseURL: string): Promise<RefreshResponse> {
  const refreshToken = await tokenStore.getRefresh();
  if (!refreshToken) throw new Error("No refresh token");

  const res = await fetch(`${baseURL}/api/v1/auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ refreshToken }),
  });

  if (!res.ok) {
    throw new Error("Refresh failed");
  }

  return (await res.json()) as RefreshResponse;
}

function isRefreshUrl(url: string) {
  return url.includes("/auth/refresh");
}

export function createAuthedRestAPI(baseURL: string): RestAPIProtocol {
  const instance = new RestAPIInstance(baseURL, {
    withCredentials: false,
    headers: { Accept: "application/json" },

    onRequest: async ({ url, init }) => {
      const accessToken = await tokenStore.getAccess();

      if (!accessToken) return { url, init };

      const headers = new Headers(init.headers);
      headers.set("Authorization", `Bearer ${accessToken}`);

      return { url, init: { ...init, headers } };
    },

    onResponse: async ({ url, init, res }) => {
      if (res.status !== 401) return res;
      if (isRefreshUrl(url)) return res;

      if (!refreshPromise) {
        refreshPromise = (async () => {
          try {
            const tokens = await refreshTokens(baseURL);
            await tokenStore.set(tokens);
            return tokens;
          } finally {
            refreshPromise = null;
          }
        })();
      }

      try {
        await refreshPromise;

        const newAccess = await tokenStore.getAccess();
        if (!newAccess) return res;

        const retryHeaders = new Headers(init.headers);
        retryHeaders.set("Authorization", `Bearer ${newAccess}`);

        return fetch(url, { ...init, headers: retryHeaders });
      } catch {
        await tokenStore.clear();
        return res;
      }
    },
  });

  return new RestAPI(instance, { APIbaseURL: "api/v1" });
}
