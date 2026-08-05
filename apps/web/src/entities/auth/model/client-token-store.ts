import { getItemOrNull, removeItem, setItem } from "@/shared/lib/local-storage";
import { LocalStorageKey } from "@/shared/lib/local-storage-key";

type ClientAuthTokens = {
  accessToken: string;
  refreshToken: string;
  oAuthToken?: string;
};

export const clientTokenStore = {
  getAccess(): string | null {
    return getItemOrNull<string>(LocalStorageKey.AccessToken);
  },

  getRefresh(): string | null {
    return getItemOrNull<string>(LocalStorageKey.RefreshToken);
  },

  getOAuth(): string | null {
    return getItemOrNull<string>(LocalStorageKey.OAuthToken);
  },

  set(next: ClientAuthTokens) {
    setItem(LocalStorageKey.AccessToken, next.accessToken);
    setItem(LocalStorageKey.RefreshToken, next.refreshToken);

    if (next.oAuthToken) {
      setItem(LocalStorageKey.OAuthToken, next.oAuthToken);
    }
  },

  clear() {
    removeItem(LocalStorageKey.AccessToken);
    removeItem(LocalStorageKey.RefreshToken);
    removeItem(LocalStorageKey.OAuthToken);
  },
};
