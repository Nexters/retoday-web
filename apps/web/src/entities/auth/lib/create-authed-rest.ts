import type { RestAPIProtocol } from "@recap/api";
import { APIError, RestAPI, RestAPIInstance } from "@recap/api";

import { authUnTokenAPIService } from "@/entities/auth/api";
import { getBackendUrl } from "@/entities/auth/lib/backend-url";
import { clientTokenStore } from "@/entities/auth/model/client-token-store";

function isRefreshUrl(url: string) {
  return url.includes("/auth/refresh");
}

type CreateAuthedRestAPIOptions = {
  apiBaseURL?: string;
};

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
      if (isRefreshUrl(url)) return res;

      try {
        const refreshToken = clientTokenStore.getRefresh();
        if (!refreshToken) {
          throw new APIError("Refresh token not found", {
            code: "REFRESH_TOKEN_NOT_FOUND",
            status: 401,
          });
        }

        const refreshRes = await authUnTokenAPIService.refreshTokens({
          refreshToken,
        });

        clientTokenStore.set(refreshRes);

        const retryHeaders = new Headers(init.headers);
        retryHeaders.set("Authorization", `Bearer ${refreshRes.accessToken}`);
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
