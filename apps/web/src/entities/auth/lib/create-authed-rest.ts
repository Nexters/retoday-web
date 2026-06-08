import type { RestAPIProtocol } from "@recap/api";
import { RestAPI, RestAPIInstance } from "@recap/api";

const CLIENT_BFF_BASE_URL = "/api/backend";

type CreateAuthedRestAPIOptions = {
  apiBaseURL?: string;
};

export function createAuthedRestAPI(
  _baseURL?: string,
  options?: CreateAuthedRestAPIOptions,
): RestAPIProtocol {
  const apiBaseURL = options?.apiBaseURL ?? "v1";

  const instance = new RestAPIInstance(CLIENT_BFF_BASE_URL, {
    withCredentials: true,
    headers: { Accept: "application/json" },
  });

  return new RestAPI(instance, { APIbaseURL: apiBaseURL });
}
