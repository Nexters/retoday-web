type LoginPayload = {
  oAuthToken: string;
  provider: "GOOGLE";
};

type SessionResponse = {
  isLoggedIn: boolean;
};

async function parseError(res: Response) {
  const body = await res.json().catch(() => ({}));
  const message =
    typeof body === "object" &&
    body &&
    "message" in body &&
    typeof body.message === "string"
      ? body.message
      : res.statusText;

  throw new Error(message || "Request failed");
}

export async function loginWithOAuth(payload: LoginPayload) {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    await parseError(res);
  }

  return res.json();
}

export async function logoutSession() {
  const res = await fetch("/api/auth/logout", {
    method: "POST",
    credentials: "include",
    headers: { Accept: "application/json" },
  });

  if (!res.ok) {
    await parseError(res);
  }

  return res.json();
}

export async function clearSession() {
  const res = await fetch("/api/auth/session", {
    method: "DELETE",
    credentials: "include",
    headers: { Accept: "application/json" },
  });

  if (!res.ok) {
    await parseError(res);
  }

  return res.json();
}

export async function fetchOAuthToken(): Promise<string> {
  const res = await fetch("/api/auth/oauth-token", {
    credentials: "include",
    headers: { Accept: "application/json" },
  });

  if (!res.ok) {
    await parseError(res);
  }

  const body = (await res.json()) as { oAuthToken?: string };

  if (!body.oAuthToken) {
    throw new Error("OAuth token not found");
  }

  return body.oAuthToken;
}

export async function fetchSession(): Promise<SessionResponse> {
  const res = await fetch("/api/auth/session", {
    credentials: "include",
    headers: { Accept: "application/json" },
  });

  if (!res.ok) {
    return { isLoggedIn: false };
  }

  return (await res.json()) as SessionResponse;
}
