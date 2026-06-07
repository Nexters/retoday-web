import { buildBackendApiUrl } from "@/entities/auth/lib/backend-url";
import { parseApiPayload } from "@/entities/auth/lib/parse-api-payload";
import { serverTokenStore } from "@/entities/auth/model/server-token-store";

type RefreshResponse = { accessToken: string; refreshToken: string };

const refreshPromises = new Map<string, Promise<RefreshResponse>>();

async function requestRefresh(
  refreshToken: string,
  apiBaseURL = "v1",
): Promise<RefreshResponse> {
  const res = await fetch(buildBackendApiUrl(apiBaseURL, "auth/refresh"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ refreshToken }),
  });

  if (!res.ok) {
    throw new Error("Refresh failed");
  }

  const body = await res.json();
  return parseApiPayload<RefreshResponse>(body);
}

export async function refreshAuthTokens(
  apiBaseURL = "v1",
): Promise<RefreshResponse | null> {
  const refreshToken = await serverTokenStore.getRefresh();
  if (!refreshToken) return null;

  const existing = refreshPromises.get(refreshToken);
  if (existing) return existing;

  const promise = (async () => {
    try {
      const tokens = await requestRefresh(refreshToken, apiBaseURL);
      await serverTokenStore.set(tokens);
      return tokens;
    } finally {
      refreshPromises.delete(refreshToken);
    }
  })();

  refreshPromises.set(refreshToken, promise);
  return promise;
}
