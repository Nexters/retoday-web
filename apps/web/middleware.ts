import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import {
  ACCESS_TOKEN_COOKIE,
  REFRESH_TOKEN_COOKIE,
} from "@/entities/auth/config/auth-cookie-keys.const";
import {
  ACCESS_TOKEN_MAX_AGE,
  REFRESH_TOKEN_MAX_AGE,
  TOKEN_COOKIE_OPTIONS,
} from "@/entities/auth/config/auth-cookie-options.const";
import { isJwtExpired } from "@/entities/auth/lib/jwt-expiry";
import { refreshAuthTokens } from "@/entities/auth/lib/refresh-auth-tokens";

function withSessionHeader(response: NextResponse, hasSession: boolean) {
  response.headers.set("x-auth-session", hasSession ? "1" : "0");
  return response;
}

function clearSession(response: NextResponse) {
  response.cookies.delete(ACCESS_TOKEN_COOKIE);
  response.cookies.delete(REFRESH_TOKEN_COOKIE);

  return response;
}

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get(ACCESS_TOKEN_COOKIE)?.value;
  const refreshToken = request.cookies.get(REFRESH_TOKEN_COOKIE)?.value;

  /**
   * 쿠키 maxAge와 실제 토큰 만료가 다를 수 있으므로 존재 여부가 아니라 exp로 판단한다.
   */
  if (accessToken && !isJwtExpired(accessToken)) {
    return withSessionHeader(NextResponse.next(), true);
  }

  if (!refreshToken || isJwtExpired(refreshToken)) {
    return clearSession(withSessionHeader(NextResponse.next(), false));
  }

  /**
   * Server Component는 쿠키를 쓸 수 없으므로 렌더가 시작되기 전인 여기서 갱신을 끝낸다.
   * 이번 요청의 SSR도 새 토큰을 읽도록 request 쿠키까지 교체한다.
   */
  const tokens = await refreshAuthTokens(refreshToken);

  if (!tokens) {
    return clearSession(withSessionHeader(NextResponse.next(), false));
  }

  request.cookies.set(ACCESS_TOKEN_COOKIE, tokens.accessToken);
  request.cookies.set(REFRESH_TOKEN_COOKIE, tokens.refreshToken);

  const response = withSessionHeader(NextResponse.next({ request }), true);

  response.cookies.set(ACCESS_TOKEN_COOKIE, tokens.accessToken, {
    ...TOKEN_COOKIE_OPTIONS,
    maxAge: ACCESS_TOKEN_MAX_AGE,
  });
  response.cookies.set(REFRESH_TOKEN_COOKIE, tokens.refreshToken, {
    ...TOKEN_COOKIE_OPTIONS,
    maxAge: REFRESH_TOKEN_MAX_AGE,
  });

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
