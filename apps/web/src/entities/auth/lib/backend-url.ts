export function getBackendUrl() {
  return process.env.NEXT_PUBLIC_BACKEND_URL ?? "";
}

export function buildBackendApiUrl(apiBaseURL: string, path: string) {
  const baseURL = getBackendUrl();
  const normalizedPath = path.replace(/^\/+/, "");
  const prefix = apiBaseURL ? `/${apiBaseURL}` : "";
  return `${baseURL}${prefix}/${normalizedPath}`;
}
