import { HistoryAPIService } from "@/entities/history/api/history.api";
import { createAuthedRestAPI } from "@/shared/lib/create-authed-rest";

export const historyAPIService = new HistoryAPIService(
  createAuthedRestAPI(import.meta.env.VITE_BACKEND_URL || ""),
);
