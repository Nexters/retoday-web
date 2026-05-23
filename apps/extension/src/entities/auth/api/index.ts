import { AuthAPIService, generateRestAPI } from "@recap/api";

export const authAPIService = new AuthAPIService(
  generateRestAPI(
    {
      APIbaseURL: "v1/auth",
    },
    {
      baseURL: import.meta.env.VITE_BACKEND_URL || "",
    },
  ),
);
