import { UserAPIService } from "@recap/api";

import { createAuthedRestAPI } from "@/shared/lib/create-authed-rest";

export const userAPIService = new UserAPIService(
  createAuthedRestAPI(import.meta.env.VITE_BACKEND_URL || ""),
);
