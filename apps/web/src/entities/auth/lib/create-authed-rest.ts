import type { RestAPIProtocol } from "@recap/api";
import { APIError, RestAPI, RestAPIInstance } from "@recap/api";

import { getBackendUrl } from "@/entities/auth/lib/backend-url";
import type { AuthTokenPair } from "@/entities/auth/lib/refresh-auth-tokens";
import { clientTokenStore } from "@/entities/auth/model/client-token-store";

type CreateAuthedRestAPIOptions = {
  apiBaseURL?: string;
};

/**
 * 동시에 여러 요청이 401을 반환하더라도
 * refresh 요청은 하나만 실행하도록 공유하는 Promise
 */
let refreshPromise: Promise<AuthTokenPair> | null = null;

/**
 * 갱신은 Route Handler에만 맡긴다.
 * 브라우저와 SSR이 항상 같은 쿠키를 보도록 갱신 창구를 하나로 유지하기 위함.
 */
async function requestRefresh(): Promise<AuthTokenPair> {
  const res = await fetch("/api/auth/refresh", {
    method: "POST",
    credentials: "include",
    headers: { Accept: "application/json" },
  });

  if (!res.ok) {
    throw new APIError("Failed to refresh tokens", {
      code: "REFRESH_TOKEN_NOT_FOUND",
      status: 401,
    });
  }

  return (await res.json()) as AuthTokenPair;
}

function refreshAccessToken(): Promise<AuthTokenPair> {
  refreshPromise ??= requestRefresh().finally(() => {
    refreshPromise = null;
  });

  return refreshPromise;
}

export function createAuthedRestAPI(
  baseURL?: string,
  options?: CreateAuthedRestAPIOptions,
): RestAPIProtocol {
  const apiBaseURL = options?.apiBaseURL ?? "v1";
  const resolvedBaseURL = baseURL || getBackendUrl();

  const instance = new RestAPIInstance(resolvedBaseURL, {
    withCredentials: false,
    headers: { Accept: "application/json" },

    onRequest: async ({ url, init }) => {
      const accessToken = clientTokenStore.getAccess();
      if (!accessToken) return { url, init };

      const headers = new Headers(init.headers);
      headers.set("Authorization", `Bearer ${accessToken}`);

      return { url, init: { ...init, headers } };
    },

    onResponse: async ({ url, init, res }) => {
      if (res.status !== 401) return res;

      try {
        const tokens = await refreshAccessToken();

        const retryHeaders = new Headers(init.headers);
        retryHeaders.set("Authorization", `Bearer ${tokens.accessToken}`);
        retryHeaders.set("Accept", "application/json");

        return fetch(url, { ...init, headers: retryHeaders });
      } catch (error) {
        clientTokenStore.clear();

        if (error instanceof APIError) {
          throw error;
        }

        return res;
      }
    },
  });

  return new RestAPI(instance, { APIbaseURL: apiBaseURL });
}
