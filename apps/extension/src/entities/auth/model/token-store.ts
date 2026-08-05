import {
  ACCESS_TOKEN_MAX_AGE_MS,
  REFRESH_TOKEN_MAX_AGE_MS,
} from "@/entities/auth/config/auth-token.const";
import { getStorage, setStorage } from "@/shared/lib/storage";

type ClientAuthTokens = {
  accessToken: string;
  refreshToken: string;
};

export const tokenStore = {
  async getAccess(): Promise<string | null> {
    const result = await getStorage(["accessToken", "accessTokenExpiresAt"]);
    return result.accessToken;
  },

  async getRefresh(): Promise<string | null> {
    const result = await getStorage(["refreshToken", "refreshTokenExpiresAt"]);
    return result.refreshToken;
  },

  async set(tokens: ClientAuthTokens): Promise<void> {
    const now = Date.now();

    await setStorage({
      accessToken: tokens.accessToken,
      accessTokenExpiresAt: now + ACCESS_TOKEN_MAX_AGE_MS,
      refreshToken: tokens.refreshToken,
      refreshTokenExpiresAt: now + REFRESH_TOKEN_MAX_AGE_MS,
    });
  },

  async clear(): Promise<void> {
    await setStorage({
      accessToken: null,
      accessTokenExpiresAt: null,
      refreshToken: null,
      refreshTokenExpiresAt: null,
    });
  },
};
