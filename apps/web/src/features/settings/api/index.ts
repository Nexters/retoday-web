import { UserAPIService } from "@recap/api";

import { createAuthedRestAPI } from "@/entities/auth/lib/create-authed-rest";

export const userAPIService = new UserAPIService(
  createAuthedRestAPI(process.env.NEXT_PUBLIC_BACKEND_URL || "", {
    apiBaseURL: "v1",
  }),
);
