import type { RestAPIProtocol } from "@recap/api";
import { APIError, RestAPI, RestAPIInstance } from "@recap/api";

import { authUnTokenAPIService } from "@/entities/auth/api/auth-un-token-api";
import { tokenStore } from "@/entities/auth/model/token-store";

type AuthTokenPair = { accessToken: string; refreshToken: string };

type CreateAuthedRestAPIOptions = {
  apiBaseURL?: string;
};

/**
 * 동시에 여러 요청이 401을 반환하더라도
 * refresh 요청은 하나만 실행하도록 공유하는 Promise
 */
let refreshPromise: Promise<AuthTokenPair> | null = null;

function isRefreshUrl(url: string) {
  return url.includes("/auth/refresh");
}

async function requestRefresh(): Promise<AuthTokenPair> {
  const refreshToken = await tokenStore.getRefresh();

  if (!refreshToken) {
    throw new APIError("Failed to refresh tokens", {
      code: "REFRESH_TOKEN_NOT_FOUND",
      status: 401,
    });
  }

  try {
    const res = await authUnTokenAPIService.refreshTokens({
      refreshToken,
    });

    await tokenStore.set(res);
    return res;
  } catch (error) {
    throw new APIError("Failed to refresh tokens", {
      code: "REFRESH_TOKEN_NOT_FOUND",
      status: 401,
      cause: error,
    });
  }
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
  const resolvedBaseURL = baseURL || import.meta.env.VITE_BACKEND_URL || "";

  const instance = new RestAPIInstance(resolvedBaseURL, {
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

      try {
        const tokens = await refreshAccessToken();

        const retryHeaders = new Headers(init.headers);
        retryHeaders.set("Authorization", `Bearer ${tokens.accessToken}`);
        retryHeaders.set("Accept", "application/json");

        return fetch(url, { ...init, headers: retryHeaders });
      } catch (error) {
        throw new APIError("Failed to refresh tokens", {
          code: "REFRESH_TOKEN_NOT_FOUND",
          status: 401,
          cause: error,
        });
      }
    },
  });

  return new RestAPI(instance, { APIbaseURL: apiBaseURL });
}
