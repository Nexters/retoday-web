import { buildBackendApiUrl } from "@/entities/auth/lib/backend-url";
import { parseApiPayload } from "@/entities/auth/lib/parse-api-payload";

export type AuthTokenPair = {
  accessToken: string;
  refreshToken: string;
};

/**
 * refresh token은 사용하는 순간 회전되어 이전 토큰이 무효해진다.
 * 같은 토큰으로 들어온 동시 요청은 하나의 호출로 합쳐 중복 소모를 막는다.
 */
const inFlightByToken = new Map<string, Promise<AuthTokenPair | null>>();

async function requestRefresh(
  refreshToken: string,
): Promise<AuthTokenPair | null> {
  const res = await fetch(buildBackendApiUrl("v1", "auth/refresh"), {
    method: "POST",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ refreshToken }),
  }).catch(() => null);

  if (!res?.ok) return null;

  const body = await res.json().catch(() => ({}));
  const tokens = parseApiPayload<Partial<AuthTokenPair>>(body);

  if (!tokens?.accessToken || !tokens?.refreshToken) return null;

  return {
    accessToken: tokens.accessToken,
    refreshToken: tokens.refreshToken,
  };
}

export function refreshAuthTokens(
  refreshToken: string,
): Promise<AuthTokenPair | null> {
  const inFlight = inFlightByToken.get(refreshToken);
  if (inFlight) return inFlight;

  const refreshPromise = requestRefresh(refreshToken).finally(() => {
    inFlightByToken.delete(refreshToken);
  });

  inFlightByToken.set(refreshToken, refreshPromise);

  return refreshPromise;
}
