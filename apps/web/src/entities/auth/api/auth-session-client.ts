import { clientTokenStore } from "@/entities/auth/model/client-token-store";

type LoginPayload = {
  oAuthToken: string;
  provider: "GOOGLE";
};

type SessionResponse = {
  isLoggedIn: boolean;
  accessToken?: string;
  refreshToken?: string;
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

  const body = (await res.json()) as {
    accessToken?: string;
    refreshToken?: string;
  };

  if (body.accessToken && body.refreshToken) {
    clientTokenStore.set({
      accessToken: body.accessToken,
      refreshToken: body.refreshToken,
    });
  }

  return body;
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

  clientTokenStore.clear();

  return res.json();
}

export async function clearSession() {
  clientTokenStore.clear();

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

  const session = (await res.json()) as SessionResponse;

  if (session.isLoggedIn && session.accessToken && session.refreshToken) {
    clientTokenStore.set({
      accessToken: session.accessToken,
      refreshToken: session.refreshToken,
    });
  } else {
    clientTokenStore.clear();
  }

  return session;
}
