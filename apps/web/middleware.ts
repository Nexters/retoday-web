import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { ACCESS_TOKEN_COOKIE } from "@/entities/auth/config/auth-cookie-keys.const";

export function middleware(request: NextRequest) {
  const hasAccessToken = Boolean(
    request.cookies.get(ACCESS_TOKEN_COOKIE)?.value,
  );

  const response = NextResponse.next();
  response.headers.set("x-auth-session", hasAccessToken ? "1" : "0");

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
