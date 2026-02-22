import { historyAPIService } from "@/entities/history/api";
import type { CreateHistoryDTO } from "@/entities/history/model/history.type";
import { extractDomainUrl } from "@/lib/url";
import type { StorageSession } from "@/types/storage";
import { calculateTimeDiff } from "@/utils/date";

const browserHistory = {
  createClosedHistory: (session: StorageSession) => {
    if (calculateTimeDiff(session.visitedAt, session.closedAt) <= 10) {
      return;
    }
    console.log("createHistory");
    historyAPIService.createHistory({
      ...session,
      url: extractDomainUrl(session.url),
      closedAt: session?.closedAt ?? new Date().getTime() / 1000,
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
};

export default browserHistory;
