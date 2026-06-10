export type CreateHistoryDTO = {
  url: string;
  visitedAt: number;
  closedAt: number;
  timeZone: string;
  title: string;
  description: string;
  faviconUrl: string;
  isClosed: boolean;
  scrollDepth?: number;
};
