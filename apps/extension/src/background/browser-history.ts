import { historyAPIService } from "@/entities/history/api";
import type { CreateHistoryDTO } from "@/entities/history/model/history.type";
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
      closedAt: session?.closedAt ?? new Date().getTime() / 1000,
      isClosed: true,
    } as CreateHistoryDTO);
  },
  createHistory: (session: StorageSession) => {
    if (calculateTimeDiff(session.visitedAt, session.closedAt) <= 10) {
      return;
    }
    console.log("createHistory");
    historyAPIService.createHistory({
      ...session,
      isClosed: false,
    } as CreateHistoryDTO);
  },
};

export default browserHistory;
