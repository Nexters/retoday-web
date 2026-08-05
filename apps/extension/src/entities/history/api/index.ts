import { createAuthedRestAPI } from "@/entities/auth/lib/create-authed-rest";
import { HistoryAPIService } from "@/entities/history/api/history.api";

export const historyAPIService = new HistoryAPIService(
  createAuthedRestAPI(import.meta.env.VITE_BACKEND_URL || "", {
    apiBaseURL: "v1",
  }),
);
