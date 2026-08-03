import type { RestAPIProtocol } from "@recap/api";
import {
  APIError,
  AuthUnTokenAPIService,
  generateRestAPI,
  RestAPI,
  RestAPIInstance,
} from "@recap/api";
import browser from "webextension-polyfill";

import { MESSAGE_TYPE } from "@/entities/history/model/messages.type";
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

    try {
      const refreshRes = await authUnTokenAPIService.refreshTokens({
        refreshToken,
      });
      await tokenStore.set(refreshRes);
      return refreshRes;
    } catch (error) {
      throw new APIError("Failed to refresh tokens", {
        code: "REFRESH_TOKEN_NOT_FOUND",
        status: 401,
        cause: error,
      });
    }
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

      refreshPromise ??= refreshTokens().finally(() => {
        refreshPromise = null;
      });

      try {
        const tokens = await refreshPromise;

        const retryHeaders = new Headers(init.headers);
        retryHeaders.set("Authorization", `Bearer ${tokens.accessToken}`);
        retryHeaders.set("Accept", "application/json");

        return fetch(url, { ...init, headers: retryHeaders });
      } catch (error) {
        await tokenStore.clear();
        void browser.runtime
          .sendMessage({ type: MESSAGE_TYPE.AUTH_CHANGED })
          .catch(() => undefined);

        if (error instanceof APIError) {
          throw error;
        }

        throw new APIError("Failed to refresh tokens", {
          code: "REFRESH_TOKEN_NOT_FOUND",
          status: 401,
        });
      }
    },
  });

  return new RestAPI(instance, { APIbaseURL: apiBaseURL });
}
