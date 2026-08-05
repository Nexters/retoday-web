import { AuthAPIService } from "@recap/api";

import { getBackendUrl } from "@/entities/auth/lib/backend-url";
import { createAuthedRestAPI } from "@/entities/auth/lib/create-authed-rest";

export const authAPIService = new AuthAPIService(
  createAuthedRestAPI(getBackendUrl(), { apiBaseURL: "v1" }),
);
