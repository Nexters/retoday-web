import { parseErrorResponse, wrapZodError } from "../errors/APIError";

import type {
  RestAPIConfig,
  RestAPIProtocol,
  RestRequestOptions,
} from "./types";

type RestAPIInstanceInit = {
  headers?: Record<string, string>;
  withCredentials?: boolean;

  onRequest?: (ctx: {
    url: string;
    init: RequestInit;
  }) =>
    | Promise<{ url: string; init: RequestInit }>
    | { url: string; init: RequestInit };

  onResponse?: (ctx: {
    url: string;
    init: RequestInit;
    res: Response;
  }) => Promise<Response> | Response;
};

export class RestAPIInstance {
  constructor(
    private baseURL: string,
    private init: RestAPIInstanceInit,
  ) {}

  async request(input: RequestInfo, init?: RequestInit) {
    let next = { url: String(input), init: init ?? {} };

    if (this.init.onRequest) {
      next = await this.init.onRequest(next);
    }

    const res = await fetch(next.url, next.init);

    if (this.init.onResponse) {
      return this.init.onResponse({ ...next, res });
    }

    return res;
  }

  getBaseURL() {
    return this.baseURL;
  }
  getDefaultHeaders() {
    return this.init.headers ?? {};
  }
  getWithCredentials() {
    return this.init.withCredentials ?? true;
  }
}

function applyPathParams(
  url: string,
  params?: Record<string, string | number>,
) {
  if (!params) return url;
  return url.replace(/:([A-Za-z0-9_]+)/g, (_, key) =>
    encodeURIComponent(String(params[key])),
  );
}

function buildQuery(query?: Record<string, unknown>) {
  if (!query) return "";
  const sp = new URLSearchParams();
  Object.entries(query).forEach(([k, v]) => {
    if (v === undefined) return;
    if (Array.isArray(v)) v.forEach((item) => sp.append(k, String(item)));
    else sp.set(k, String(v));
  });
  const s = sp.toString();
  return s ? `?${s}` : "";
}

async function readBody(res: Response, parseAs: "json" | "text" | "blob") {
  if (parseAs === "text") return res.text();
  if (parseAs === "blob") return res.blob();
  return res.json().catch(() => ({}));
}

export class RestAPI implements RestAPIProtocol {
  constructor(
    private instance: RestAPIInstance,
    private config: RestAPIConfig,
  ) {}

  private async core<T>(
    method: string,
    opts: RestRequestOptions<T>,
  ): Promise<T> {
    const {
      url,
      param,
      query,
      data,
      headers,
      timeoutMs,
      parseAs = "json",
      validate,
      signal,
      credentials,
    } = opts;

    const path = applyPathParams(url, param);
    const basePrefix = this.config.APIbaseURL
      ? `/${this.config.APIbaseURL}`
      : "";
    const fullUrl = `${this.instance.getBaseURL()}${basePrefix}/${path.replace(
      /^\/+/,
      "",
    )}${buildQuery(query)}`;

    const controller = new AbortController();
    const timer = timeoutMs
      ? setTimeout(() => controller.abort(), timeoutMs)
      : undefined;

    const methodUpper = method.toUpperCase();
    const isGetLike = methodUpper === "GET" || methodUpper === "HEAD";

    const hdr: Record<string, string> = {
      ...this.instance.getDefaultHeaders(),
      ...(headers ?? {}),
    };

    if (isGetLike && "Content-Type" in hdr) delete hdr["Content-Type"];

    const reqInit: RequestInit = {
      method: methodUpper,
      headers: hdr,
      credentials:
        credentials ??
        (this.instance.getWithCredentials() ? "include" : "same-origin"),
      signal: signal ?? controller.signal,
    };

    if (!isGetLike && data !== undefined) {
      const isForm = hdr["Content-Type"] === "multipart/form-data";
      if (isForm) {
        delete hdr["Content-Type"];
        reqInit.body = data as unknown as BodyInit;
      } else {
        if (!hdr["Content-Type"]) hdr["Content-Type"] = "application/json";
        reqInit.body = JSON.stringify(data);
      }
    }

    try {
      const res = await this.instance.request(fullUrl, reqInit);

      if (!res.ok) {
        throw await parseErrorResponse(res, {
          url: fullUrl,
          method: methodUpper,
        });
      }

      const body = await readBody(res, parseAs);

      const isEnvelope =
        body && typeof body === "object" && "success" in body && "data" in body;

      const payload = isEnvelope ? body.data : body;

      if (validate) {
        try {
          return validate(payload);
        } catch (err) {
          wrapZodError(err, fullUrl, methodUpper);
        }
      }

      return payload as T;
    } finally {
      if (timer) clearTimeout(timer);
    }
  }

  get<T>(opts: RestRequestOptions<T>) {
    return this.core<T>("GET", opts);
  }
  post<T>(opts: RestRequestOptions<T>) {
    return this.core<T>("POST", opts);
  }
  put<T>(opts: RestRequestOptions<T>) {
    return this.core<T>("PUT", opts);
  }
  patch<T>(opts: RestRequestOptions<T>) {
    return this.core<T>("PATCH", opts);
  }
  delete<T>(opts: RestRequestOptions<T>) {
    return this.core<T>("DELETE", opts);
  }
}
