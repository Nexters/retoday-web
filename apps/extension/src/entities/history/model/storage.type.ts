export interface PageSnapshot {
  url: string;
  title: string;
  scrollDepth?: number;
  metadata: {
    description?: string | null;
    faviconUrl?: string | null;
  };
}

export interface StorageSession extends PageSnapshot {
  visitedAt: number;
  closedAt?: number | null;
  tabId?: number;
}

export interface StorageData {
  sessions: Record<string, StorageSession>;
  accessToken: string | null;
  accessTokenExpiresAt: number | null;
  refreshToken: string | null;
  refreshTokenExpiresAt: number | null;
  excludedDomains: string[];
}

export const defaultStorage: StorageData = {
  sessions: {},
  accessToken: null,
  accessTokenExpiresAt: null,
  refreshToken: null,
  refreshTokenExpiresAt: null,
  excludedDomains: [],
};
