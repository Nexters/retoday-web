import { AuthUnTokenAPIService, generateRestAPI } from "@recap/api";

export const authUnTokenAPIService = new AuthUnTokenAPIService(
  generateRestAPI(
    { APIbaseURL: "v1" },
    {
      baseURL: import.meta.env.VITE_BACKEND_URL || "",
      withCredentials: false,
      headers: { Accept: "application/json" },
    },
  ),
);
