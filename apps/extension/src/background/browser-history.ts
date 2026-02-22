import { historyAPIService } from "@/entities/history/api";
import type { CreateHistoryDTO } from "@/entities/history/model/history.type";
import { extractDomainUrl } from "@/lib/url";
import type { StorageSession } from "@/types/storage";
import { calculateTimeDiff } from "@/utils/date";

const browserHistory = {
  createClosedHistory: (session: StorageSession) => {
    // 이미 닫히 세션에 대해서 실행 X
    if (session?.closedAt) return;

    const closedAt = new Date().getTime() / 1000;

    if (calculateTimeDiff(session.visitedAt, closedAt) <= 10) {
      return;
    }
    console.log("createClosedHistory");
    historyAPIService.createHistory({
      ...session,
      url: extractDomainUrl(session.url),
      closedAt,
      isClosed: true,
    } as CreateHistoryDTO);
  },
  createHistory: (session: StorageSession) => {
    if (!session) {
      return;
    }
    if (calculateTimeDiff(session.visitedAt, session.closedAt) <= 10) {
      return;
    }
    console.log("createHistory");
    historyAPIService.createHistory({
      ...session,
      url: extractDomainUrl(session.url),
      isClosed: false,
    } as CreateHistoryDTO);
  },
  isExcludedDomain: (url: string, excludeDomains: string[]) => {
    const normalizedUrl = extractDomainUrl(url);

    const { host } = new URL(normalizedUrl);

    return excludeDomains.includes(host);
  },
};

export default browserHistory;
