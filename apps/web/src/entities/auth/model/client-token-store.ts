const ACCESS_TOKEN_KEY = "auth.accessToken";
const REFRESH_TOKEN_KEY = "auth.refreshToken";

type ClientAuthTokens = {
  accessToken: string;
  refreshToken: string;
};

function canUseStorage() {
  return typeof window !== "undefined";
}

export const clientTokenStore = {
  getAccess(): string | null {
    if (!canUseStorage()) return null;
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  },

  getRefresh(): string | null {
    if (!canUseStorage()) return null;
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  },

  set(next: ClientAuthTokens) {
    if (!canUseStorage()) return;

    localStorage.setItem(ACCESS_TOKEN_KEY, next.accessToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, next.refreshToken);
  },

  clear() {
    if (!canUseStorage()) return;

    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  },
};
