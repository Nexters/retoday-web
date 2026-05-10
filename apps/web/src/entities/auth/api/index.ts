import { generateRestAPI } from "@recap/api";

import { AuthAPIService } from "@/entities/auth/api/auth-api.service";
import { createAuthedRestAPI } from "@/entities/auth/lib/create-authed-rest";

export const authAPIService = new AuthAPIService(
  generateRestAPI(
    {
      APIbaseURL: `api/v1/auth`,
    },
    {
      baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || "",
    },
  ),
);

export const authWithTokenAPIService = new AuthAPIService(
  createAuthedRestAPI(process.env.NEXT_PUBLIC_BACKEND_URL || ""),
);
