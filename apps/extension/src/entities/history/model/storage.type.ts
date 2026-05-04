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
  refreshToken: string | null;
  excludedDomains: string[];
}

export const defaultStorage: StorageData = {
  sessions: {},
  accessToken: null,
  refreshToken: null,
  excludedDomains: [],
};
