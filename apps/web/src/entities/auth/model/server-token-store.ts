import { cookies } from "next/headers";

import {
  ACCESS_TOKEN_COOKIE,
  OAUTH_TOKEN_COOKIE,
  REFRESH_TOKEN_COOKIE,
} from "@/entities/auth/config/auth-cookie-keys.const";
import {
  ACCESS_TOKEN_MAX_AGE,
  HTTP_ONLY_COOKIE_OPTIONS,
  OAUTH_TOKEN_MAX_AGE,
  REFRESH_TOKEN_MAX_AGE,
  TOKEN_COOKIE_OPTIONS,
} from "@/entities/auth/config/auth-cookie-options.const";

type AuthTokens = {
  accessToken: string;
  refreshToken: string;
  oAuthToken?: string;
};

export const serverTokenStore = {
  async getAccess() {
    const cookieStore = await cookies();
    return cookieStore.get(ACCESS_TOKEN_COOKIE)?.value ?? null;
  },

  async getRefresh() {
    const cookieStore = await cookies();
    return cookieStore.get(REFRESH_TOKEN_COOKIE)?.value ?? null;
  },

  async getOAuth() {
    const cookieStore = await cookies();
    return cookieStore.get(OAUTH_TOKEN_COOKIE)?.value ?? null;
  },

  async get() {
    const cookieStore = await cookies();

    return {
      accessToken: cookieStore.get(ACCESS_TOKEN_COOKIE)?.value ?? null,
      refreshToken: cookieStore.get(REFRESH_TOKEN_COOKIE)?.value ?? null,
      oAuthToken: cookieStore.get(OAUTH_TOKEN_COOKIE)?.value ?? null,
    };
  },

  async hasAccess() {
    const accessToken = await this.getAccess();
    return Boolean(accessToken);
  },

  async hasRefresh() {
    const refreshToken = await this.getRefresh();
    return Boolean(refreshToken);
  },

  async set(tokens: AuthTokens) {
    const cookieStore = await cookies();

    cookieStore.set(ACCESS_TOKEN_COOKIE, tokens.accessToken, {
      ...TOKEN_COOKIE_OPTIONS,
      maxAge: ACCESS_TOKEN_MAX_AGE,
    });

    cookieStore.set(REFRESH_TOKEN_COOKIE, tokens.refreshToken, {
      ...TOKEN_COOKIE_OPTIONS,
      maxAge: REFRESH_TOKEN_MAX_AGE,
    });

    if (tokens.oAuthToken) {
      cookieStore.set(OAUTH_TOKEN_COOKIE, tokens.oAuthToken, {
        ...HTTP_ONLY_COOKIE_OPTIONS,
        maxAge: OAUTH_TOKEN_MAX_AGE,
      });
    }
  },

  async clear() {
    const cookieStore = await cookies();

    cookieStore.delete(ACCESS_TOKEN_COOKIE);
    cookieStore.delete(REFRESH_TOKEN_COOKIE);
    cookieStore.delete(OAUTH_TOKEN_COOKIE);
  },
};
