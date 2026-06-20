import type { RestAPIProtocol } from "@recap/api";
import { RestAPI, RestAPIInstance } from "@recap/api";

import { getBackendUrl } from "@/entities/auth/lib/backend-url";
import { refreshAuthTokens } from "@/entities/auth/lib/refresh-auth-tokens";
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
        const refreshed = await refreshAuthTokens(apiBaseURL);

        if (!refreshed) return res;

        const retryHeaders = new Headers();
        retryHeaders.set("Authorization", `Bearer ${refreshed.accessToken}`);
        retryHeaders.set("Accept", "application/json");

        return fetch(url, { ...init, headers: retryHeaders });
      } catch {
        await serverTokenStore.clear();
        return res;
      }
    },
  });

  return new RestAPI(instance, { APIbaseURL: apiBaseURL });
}
