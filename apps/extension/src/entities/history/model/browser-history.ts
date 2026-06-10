import { calculateTimeDiff } from "@recap/lib";

import { historyAPIService } from "@/entities/history/api";
import type { CreateHistoryDTO } from "@/entities/history/model/history.type";
import type { StorageSession } from "@/entities/history/model/storage.type";
import { CURRENT_LOCATION } from "@/shared/config/location";
import { extractDomainUrl } from "@/shared/lib/url";

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
      url: extractDomainUrl(session.url),
      visitedAt: session.visitedAt,
      closedAt,
      timeZone: CURRENT_LOCATION,
      title: session.title,
      description: session.metadata.description,
      faviconUrl: session.metadata.faviconUrl,
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
      url: extractDomainUrl(session.url),
      visitedAt: session.visitedAt,
      closedAt: session.closedAt,
      timeZone: CURRENT_LOCATION,
      title: session.title,
      description: session.metadata.description,
      faviconUrl: session.metadata.faviconUrl,
      isClosed: false,
    } as CreateHistoryDTO);
  },
  isExcludedDomain: (url: string, excludeDomains: string[]) => {
    const normalizedUrl = extractDomainUrl(url);

    const { host } = new URL(normalizedUrl);
    const normalizedHost = host.replace(/^www\./, "");

    return excludeDomains.some(
      (domain) => domain.replace(/^www\./, "") === normalizedHost,
    );
  },
};

export default browserHistory;
