import { getBackendUrl } from "@/entities/auth/lib/backend-url";
import { refreshAuthTokens } from "@/entities/auth/lib/refresh-auth-tokens";
import { serverTokenStore } from "@/entities/auth/model/server-token-store";

const HOP_BY_HOP_HEADERS = new Set([
  "connection",
  "keep-alive",
  "proxy-authenticate",
  "proxy-authorization",
  "te",
  "trailer",
  "transfer-encoding",
  "upgrade",
  "host",
  "cookie",
  "content-length",
]);

function buildBackendUrl(pathSegments: string[], search: string) {
  const path = pathSegments.join("/");
  const backendUrl = getBackendUrl().replace(/\/+$/, "");
  const searchSuffix = search ? `?${search}` : "";
  return `${backendUrl}/${path}${searchSuffix}`;
}

function isRefreshPath(pathSegments: string[]) {
  return pathSegments.join("/").includes("auth/refresh");
}

function buildForwardHeaders(req: Request, accessToken: string | null) {
  const headers = new Headers();

  req.headers.forEach((value, key) => {
    if (HOP_BY_HOP_HEADERS.has(key.toLowerCase())) return;
    headers.set(key, value);
  });

  headers.set("Accept", "application/json");

  if (accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  } else {
    headers.delete("Authorization");
  }

  return headers;
}

async function forwardRequest(
  req: Request,
  pathSegments: string[],
  accessToken: string | null,
) {
  const url = new URL(req.url);
  const targetUrl = buildBackendUrl(pathSegments, url.searchParams.toString());
  const headers = buildForwardHeaders(req, accessToken);
  const method = req.method.toUpperCase();
  const hasBody = !["GET", "HEAD"].includes(method);

  return fetch(targetUrl, {
    method,
    headers,
    body: hasBody ? req.body : undefined,
    duplex: hasBody ? "half" : undefined,
  } as RequestInit);
}

export async function proxyBackendRequest(
  req: Request,
  pathSegments: string[],
) {
  const accessToken = await serverTokenStore.getAccess();
  let res = await forwardRequest(req, pathSegments, accessToken);

  if (res.status === 401 && !isRefreshPath(pathSegments)) {
    try {
      const refreshed = await refreshAuthTokens();
      if (refreshed) {
        const newAccess = await serverTokenStore.getAccess();
        res = await forwardRequest(req, pathSegments, newAccess);
      } else {
        await serverTokenStore.clear();
      }
    } catch {
      await serverTokenStore.clear();
    }
  }

  const responseHeaders = new Headers(res.headers);
  responseHeaders.delete("set-cookie");

  return new Response(res.body, {
    status: res.status,
    statusText: res.statusText,
    headers: responseHeaders,
  });
}
