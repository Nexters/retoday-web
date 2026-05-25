import type { RestAPIProtocol } from "@recap/api";
import { RestAPI, RestAPIInstance } from "@recap/api";

import { tokenStore } from "@/entities/auth/model/token-store";

type RefreshResponse = { accessToken: string; refreshToken: string };

let refreshPromise: Promise<RefreshResponse> | null = null;

function buildApiUrl(baseURL: string, apiBaseURL: string, path: string) {
  const normalizedPath = path.replace(/^\/+/, "");
  const prefix = apiBaseURL ? `/${apiBaseURL}` : "";
  return `${baseURL}${prefix}/${normalizedPath}`;
}

async function refreshTokens(
  baseURL: string,
  apiBaseURL: string,
): Promise<RefreshResponse> {
  const refreshToken = tokenStore.getRefresh();
  if (!refreshToken) throw new Error("No refresh token");

  const res = await fetch(buildApiUrl(baseURL, apiBaseURL, "auth/refresh"), {
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

type CreateAuthedRestAPIOptions = {
  apiBaseURL?: string;
};

export function createAuthedRestAPI(
  baseURL: string,
  options?: CreateAuthedRestAPIOptions,
): RestAPIProtocol {
  const apiBaseURL = options?.apiBaseURL ?? "v1";
  const instance = new RestAPIInstance(baseURL, {
    withCredentials: false,
    headers: { Accept: "application/json" },

    onRequest: async ({ url, init }) => {
      const accessToken = tokenStore.getAccess();
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
            const tokens = await refreshTokens(baseURL, apiBaseURL);
            tokenStore.set(tokens);
            return tokens;
          } finally {
            refreshPromise = null;
          }
        })();
      }

      try {
        await refreshPromise;

        const newAccess = tokenStore.getAccess();
        if (!newAccess) return res;

        const retryHeaders = new Headers(init.headers);
        retryHeaders.set("Authorization", `Bearer ${newAccess}`);

        return fetch(url, { ...init, headers: retryHeaders });
      } catch {
        tokenStore.clear();
        return res;
      }
    },
  });

  return new RestAPI(instance, { APIbaseURL: apiBaseURL });
}
