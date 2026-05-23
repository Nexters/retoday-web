import { AuthAPIService, generateRestAPI } from "@recap/api";

import { createAuthedRestAPI } from "@/entities/auth/lib/create-authed-rest";

export const authAPIService = new AuthAPIService(
  generateRestAPI(
    {
      APIbaseURL: `v1/auth`,
    },
    {
      baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || "",
    },
  ),
);

export const authWithTokenAPIService = new AuthAPIService(
  createAuthedRestAPI(process.env.NEXT_PUBLIC_BACKEND_URL || ""),
);
