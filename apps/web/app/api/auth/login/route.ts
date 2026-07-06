import { NextResponse } from "next/server";

import { buildBackendApiUrl } from "@/entities/auth/lib/backend-url";
import { parseApiPayload } from "@/entities/auth/lib/parse-api-payload";
import { serverTokenStore } from "@/entities/auth/model/server-token-store";

type LoginResponse = { accessToken: string; refreshToken: string };
type LoginRequest = {
  oAuthToken?: string;
  provider?: string;
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as LoginRequest;

    if (!body.oAuthToken) {
      return NextResponse.json(
        { message: "OAuth token is required" },
        { status: 400 },
      );
    }

    const res = await fetch(buildBackendApiUrl("v1", "auth/login"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    });

    const responseBody = await res.json().catch(() => ({}));

    if (!res.ok) {
      return NextResponse.json(responseBody, { status: res.status });
    }

    const tokens = parseApiPayload<LoginResponse>(responseBody);

    if (!tokens?.accessToken || !tokens?.refreshToken) {
      return NextResponse.json(
        { message: "Invalid login response" },
        { status: 500 },
      );
    }

    await serverTokenStore.set({
      ...tokens,
      oAuthToken: body.oAuthToken,
    });

    return NextResponse.json({
      ok: true,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: error instanceof Error ? error.message : "Login failed",
      },
      { status: 500 },
    );
  }
}
