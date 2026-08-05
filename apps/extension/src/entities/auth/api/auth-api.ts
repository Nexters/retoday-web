import { AuthAPIService } from "@recap/api";

import { createAuthedRestAPI } from "@/entities/auth/lib/create-authed-rest";

export const authAPIService = new AuthAPIService(
  createAuthedRestAPI(import.meta.env.VITE_BACKEND_URL || "", {
    apiBaseURL: "v1",
  }),
);
