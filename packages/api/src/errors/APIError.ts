import { z } from "zod";

export type ApiMeta = {
  errorType?: string;
  errorMessage?: string;
};

export type ApiErrorBody = {
  code: string;
  message: string;
};

export function isApiErrorBody(value: unknown): value is ApiErrorBody {
  return (
    typeof value === "object" &&
    value !== null &&
    "code" in value &&
    "message" in value &&
    typeof (value as { code: unknown }).code === "string" &&
    typeof (value as { message: unknown }).message === "string"
  );
}

export class APIError extends Error {
  public code?: string;
  public status?: number;
  public meta?: ApiMeta;
  public url?: string;
  public method?: string;

  constructor(
    message: string,
    opts?: {
      code?: string;
      status?: number;
      meta?: ApiMeta;
      url?: string;
      method?: string;
      cause?: unknown;
    },
  ) {
    super(
      message,
      opts?.cause ? ({ cause: opts.cause } as ErrorOptions) : undefined,
    );

    this.name = "APIError";
    this.code = opts?.code;
    this.status = opts?.status;
    this.meta = opts?.meta;
    this.url = opts?.url;
    this.method = opts?.method;
  }
}

export async function parseErrorResponse(
  response: Response,
  opts?: {
    url?: string;
    method?: string;
  },
): Promise<APIError> {
  const text = await response.text().catch(() => "");
  let body: unknown = text;

  if (text) {
    try {
      body = JSON.parse(text);
    } catch {
      body = text;
    }
  }

  if (isApiErrorBody(body)) {
    return new APIError(body.message, {
      code: body.code,
      status: response.status,
      meta: {
        errorType: "HTTP_ERROR",
        errorMessage: body.message,
      },
      url: opts?.url,
      method: opts?.method,
    });
  }

  const fallbackMessage = text || response.statusText || "Request failed";

  return new APIError(fallbackMessage, {
    status: response.status,
    meta: {
      errorType: "HTTP_ERROR",
      errorMessage: fallbackMessage,
    },
    url: opts?.url,
    method: opts?.method,
  });
}

export function wrapZodError(err: unknown, url?: string, method?: string) {
  if (err instanceof z.ZodError) {
    const msg = generateZodError(err);

    console.error(
      `[Zod Validate Log]\n- api-url: ${url || "endpoint"}\n- method: ${method || "UNKNOWN"}\n`,
      err,
    );

    throw new APIError(msg, {
      meta: { errorType: "ZOD_ERROR", errorMessage: msg },
      url,
      method,
    });
  }
  throw err;
}

const generateZodError = (error: z.ZodError) => {
  let message = "";

  error.issues.forEach((issue) => {
    if (issue.code === "invalid_type") {
      const expected = issue.expected;
      const received = issue.input;
      message = `Error: Invalid data at path ${issue.path.join(" -> ")}
- Code: ${issue.code}
- Expected: ${expected}
- Received: ${received}
- Message: ${issue.message}`;
    }
  });

  return message;
};

export const catchAPIError = (error: Error | unknown) => {
  console.log(error);

  if (error instanceof APIError) {
    return console.error(error.message);
  }

  if (error instanceof Error) {
    return console.error(error.message);
  }

  console.error("지금 요청을 처리할 수 없습니다. 잠시 후 다시 시도하세요.");
};
