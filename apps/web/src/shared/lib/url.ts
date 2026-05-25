export const buildUrl = (pathname: string, searchParams: URLSearchParams) => {
  const queryString = searchParams.toString();

  return queryString ? `${pathname}?${queryString}` : pathname;
};

export const getHostFromUrl = (url: string) => {
  if (!url) return "";

  const value = url.trim();
  if (!value) return "-";

  const host = value.replace(/^https?:\/\//, "").split("/")[0];
  return host?.split(".")[0] || host;
};

export const toHttpsUrl = (domain: string) => {
  const trimmed = domain.trim();
  if (!trimmed) return "-";
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://"))
    return trimmed;
  return `https://${trimmed}`;
};
