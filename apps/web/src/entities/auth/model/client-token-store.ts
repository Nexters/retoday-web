import { deleteCookie, getCookie, setCookie } from "cookies-next/client";

import {
  ACCESS_TOKEN_COOKIE,
  REFRESH_TOKEN_COOKIE,
} from "@/entities/auth/config/auth-cookie-keys.const";
import {
  ACCESS_TOKEN_MAX_AGE,
  REFRESH_TOKEN_MAX_AGE,
} from "@/entities/auth/config/auth-cookie-options.const";

type ClientAuthTokens = {
  accessToken: string;
  refreshToken: string;
};

const clientCookieOptions = {
  path: "/",
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
};

export const clientTokenStore = {
  getAccess(): string | null {
    const value = getCookie(ACCESS_TOKEN_COOKIE);
    return typeof value === "string" ? value : null;
  },

  getRefresh(): string | null {
    const value = getCookie(REFRESH_TOKEN_COOKIE);
    return typeof value === "string" ? value : null;
  },

  set(next: ClientAuthTokens) {
    setCookie(ACCESS_TOKEN_COOKIE, next.accessToken, {
      ...clientCookieOptions,
      maxAge: ACCESS_TOKEN_MAX_AGE,
    });
    setCookie(REFRESH_TOKEN_COOKIE, next.refreshToken, {
      ...clientCookieOptions,
      maxAge: REFRESH_TOKEN_MAX_AGE,
    });
  },

  clear() {
    deleteCookie(ACCESS_TOKEN_COOKIE, { path: "/" });
    deleteCookie(REFRESH_TOKEN_COOKIE, { path: "/" });
  },
};
