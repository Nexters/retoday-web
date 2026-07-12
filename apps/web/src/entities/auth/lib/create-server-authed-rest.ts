import type { RestAPIProtocol } from "@recap/api";
import { APIError, RestAPI, RestAPIInstance } from "@recap/api";

import { authUnTokenAPIService } from "@/entities/auth/api";
import { getBackendUrl } from "@/entities/auth/lib/backend-url";
import { serverTokenStore } from "@/entities/auth/model/server-token-store";

function isRefreshUrl(url: string) {
  return url.includes("/auth/refresh");
}

type CreateServerAuthedRestAPIOptions = {
  apiBaseURL?: string;
};

export function createServerAuthedRestAPI(
  baseURL?: string,
  options?: CreateServerAuthedRestAPIOptions,
): RestAPIProtocol {
  const apiBaseURL = options?.apiBaseURL ?? "v1";
  const resolvedBaseURL = baseURL ?? getBackendUrl();

  const instance = new RestAPIInstance(resolvedBaseURL, {
    withCredentials: false,
    headers: { Accept: "application/json" },

    onRequest: async ({ url, init }) => {
      const accessToken = await serverTokenStore.getAccess();
      if (!accessToken) return { url, init };

      const headers = new Headers(init.headers);
      headers.set("Authorization", `Bearer ${accessToken}`);

      return { url, init: { ...init, headers } };
    },

    onResponse: async ({ url, init, res }) => {
      if (res.status !== 401) return res;
      if (isRefreshUrl(url)) return res;

      try {
        const refreshToken = await serverTokenStore.getRefresh();
        if (!refreshToken) {
          throw new APIError("Refresh token not found", {
            code: "REFRESH_TOKEN_NOT_FOUND",
            status: 401,
          });
        }

        const refreshRes = await authUnTokenAPIService.refreshTokens({
          refreshToken,
        });

        await serverTokenStore.set(refreshRes);

        const retryHeaders = new Headers(init.headers);
        retryHeaders.set("Authorization", `Bearer ${refreshRes.accessToken}`);
        retryHeaders.set("Accept", "application/json");

        return fetch(url, { ...init, headers: retryHeaders });
      } catch (error) {
        await serverTokenStore.clear();

        if (error instanceof APIError) {
          throw error;
        }

        return res;
      }
    },
  });

  return new RestAPI(instance, { APIbaseURL: apiBaseURL });
}
