import { AuthUnTokenAPIService, generateRestAPI } from "@recap/api";

import { getBackendUrl } from "@/entities/auth/lib/backend-url";

export const authUnTokenAPIService = new AuthUnTokenAPIService(
  generateRestAPI(
    { APIbaseURL: "v1" },
    {
      baseURL: getBackendUrl(),
      withCredentials: false,
      headers: { Accept: "application/json" },
    },
  ),
);
