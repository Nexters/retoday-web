type JwtPayload = { exp?: number };

function decodeBase64Url(value: string): string | null {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized.padEnd(
    normalized.length + ((4 - (normalized.length % 4)) % 4),
    "=",
  );

  try {
    return atob(padded);
  } catch {
    return null;
  }
}

/** 서명 검증은 백엔드가 한다. 여기서는 갱신 시점 판단용으로 만료 시각만 읽는다. */
export function getJwtExpiresAt(token: string): number | null {
  const payload = token.split(".")[1];
  if (!payload) return null;

  const decoded = decodeBase64Url(payload);
  if (!decoded) return null;

  try {
    const { exp } = JSON.parse(decoded) as JwtPayload;
    return typeof exp === "number" ? exp * 1000 : null;
  } catch {
    return null;
  }
}

/** exp를 읽지 못하면 만료로 단정하지 않고 백엔드 판단에 맡긴다. */
export function isJwtExpired(token: string, leewayMs = 10_000): boolean {
  const expiresAt = getJwtExpiresAt(token);
  if (expiresAt === null) return false;

  return Date.now() + leewayMs >= expiresAt;
}
