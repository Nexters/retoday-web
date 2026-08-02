import type { RestAPIProtocol } from "@recap/api";
import { RestAPI, RestAPIInstance } from "@recap/api";

import { getBackendUrl } from "@/entities/auth/lib/backend-url";
import { serverTokenStore } from "@/entities/auth/model/server-token-store";

type CreateServerAuthedRestAPIOptions = {
  apiBaseURL?: string;
};

export function createServerAuthedRestAPI(
  baseURL?: string,
  options?: CreateServerAuthedRestAPIOptions,
): RestAPIProtocol {
  const apiBaseURL = options?.apiBaseURL ?? "v1";
  const resolvedBaseURL = baseURL ?? getBackendUrl();

  /**
   * Server Component 렌더 중에는 Set-Cookie를 보낼 수 없어 회전된 토큰을 저장할 수 없다.
   * 여기서 refresh를 시도하면 1회용 refresh token만 소모하고 쿠키에는 무효한 토큰이 남으므로,
   * 갱신은 middleware와 /api/auth/refresh에서만 수행한다.
   */
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
  });

  return new RestAPI(instance, { APIbaseURL: apiBaseURL });
}
