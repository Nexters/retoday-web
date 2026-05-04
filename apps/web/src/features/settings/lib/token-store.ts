const ACCESS_KEY = "auth.accessToken";
const REFRESH_KEY = "auth.refreshToken";

export const tokenStore = {
  getAccess() {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(ACCESS_KEY);
  },

  getRefresh() {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(REFRESH_KEY);
  },

  set(tokens: { accessToken: string; refreshToken: string }) {
    if (typeof window === "undefined") return;
    localStorage.setItem(ACCESS_KEY, tokens.accessToken);
    localStorage.setItem(REFRESH_KEY, tokens.refreshToken);
  },

  clear() {
    if (typeof window === "undefined") return;
    localStorage.removeItem(ACCESS_KEY);
    localStorage.removeItem(REFRESH_KEY);
  },
};
