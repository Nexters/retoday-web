import { getStorage, setStorage } from "@/shared/lib/storage";

export const tokenStore = {
  async getAccess(): Promise<string | null> {
    const result = await getStorage(["accessToken"]);
    return result.accessToken;
  },

  async getRefresh(): Promise<string | null> {
    const result = await getStorage(["refreshToken"]);
    return result.refreshToken;
  },

  async set(tokens: {
    accessToken: string;
    refreshToken: string;
  }): Promise<void> {
    await setStorage({
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    });
  },

  async clear(): Promise<void> {
    await setStorage({
      accessToken: null,
      refreshToken: null,
    });
  },
};
