import type { RestAPIProtocol } from "@recap/api";
import {
  APIError,
  AuthUnTokenAPIService,
  generateRestAPI,
  RestAPI,
  RestAPIInstance,
} from "@recap/api";

import { tokenStore } from "@/shared/lib/token-store";

type RefreshResponse = { accessToken: string; refreshToken: string };

let refreshPromise: Promise<RefreshResponse> | null = null;

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

  const authUnTokenAPIService = new AuthUnTokenAPIService(
    generateRestAPI(
      { APIbaseURL: apiBaseURL },
      {
        baseURL,
        withCredentials: false,
        headers: { Accept: "application/json" },
      },
    ),
  );

  async function refreshTokens(): Promise<RefreshResponse> {
    const refreshToken = await tokenStore.getRefresh();
    if (!refreshToken) {
      throw new APIError("Refresh token not found", {
        code: "REFRESH_TOKEN_NOT_FOUND",
        status: 401,
      });
    }

    const refreshRes = await authUnTokenAPIService.refreshTokens({
      refreshToken,
    });

    await tokenStore.set(refreshRes);

    return refreshRes;
  }

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

      // 동시에 여러 요청이 401을 받아도 refresh는 한 번만 수행한다.
      if (!refreshPromise) {
        refreshPromise = refreshTokens().finally(() => {
          refreshPromise = null;
        });
      }

      try {
        const refreshRes = await refreshPromise;

        const retryHeaders = new Headers(init.headers);
        retryHeaders.set("Authorization", `Bearer ${refreshRes.accessToken}`);
        retryHeaders.set("Accept", "application/json");

        return fetch(url, { ...init, headers: retryHeaders });
      } catch (error) {
        if (error instanceof APIError) {
          throw error;
        }

        return res;
      }
    },
  });

  return new RestAPI(instance, { APIbaseURL: apiBaseURL });
}
