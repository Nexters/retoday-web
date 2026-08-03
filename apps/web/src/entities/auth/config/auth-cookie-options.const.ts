export const AUTH_COOKIE_OPTIONS = {
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
};

/** access/refresh — client Bearer + server SSR 둘 다 사용 */
export const TOKEN_COOKIE_OPTIONS = {
  ...AUTH_COOKIE_OPTIONS,
  httpOnly: false,
};

/** oAuth 등 서버 전용 */
export const HTTP_ONLY_COOKIE_OPTIONS = {
  ...AUTH_COOKIE_OPTIONS,
  httpOnly: true,
};

export const ACCESS_TOKEN_MAX_AGE = 60 * 15; // 15분
export const REFRESH_TOKEN_MAX_AGE = 60 * 60 * 24 * 30; // 30일
export const OAUTH_TOKEN_MAX_AGE = 60 * 60 * 24 * 30; // 30일
