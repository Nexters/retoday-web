import type { RestAPIProtocol } from "@recap/api";
import { RestAPI, RestAPIInstance } from "@recap/api";

import { clearSession } from "@/entities/auth/api/auth-session-client";

const CLIENT_BFF_BASE_URL = "/api/backend";

let refreshPromise: Promise<boolean> | null = null;

async function refreshSession(): Promise<boolean> {
  const res = await fetch("/api/auth/refresh", {
    method: "POST",
    credentials: "include",
    headers: { Accept: "application/json" },
  });

  return res.ok;
}

function isRefreshUrl(url: string) {
  return url.includes("/auth/refresh");
}

type CreateAuthedRestAPIOptions = {
  apiBaseURL?: string;
};

export function createAuthedRestAPI(
  _baseURL?: string,
  options?: CreateAuthedRestAPIOptions,
): RestAPIProtocol {
  const apiBaseURL = options?.apiBaseURL ?? "v1";

  const instance = new RestAPIInstance(CLIENT_BFF_BASE_URL, {
    withCredentials: true,
    headers: { Accept: "application/json" },

    onResponse: async ({ url, init, res }) => {
      if (res.status !== 401) return res;
      if (isRefreshUrl(url)) return res;

      if (!refreshPromise) {
        refreshPromise = (async () => {
          try {
            return await refreshSession();
          } finally {
            refreshPromise = null;
          }
        })();
      }

      try {
        const refreshed = await refreshPromise;
        if (!refreshed) return res;

        return fetch(url, { ...init, credentials: "include" });
      } catch {
        await clearSession();
        return res;
      }
    },
  });

  return new RestAPI(instance, { APIbaseURL: apiBaseURL });
}
