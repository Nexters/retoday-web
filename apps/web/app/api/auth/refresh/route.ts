import { NextResponse } from "next/server";

import { refreshAuthTokens } from "@/entities/auth/lib/refresh-auth-tokens";

type RefreshRequest = {
  refreshToken?: string;
};

export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => ({}))) as RefreshRequest;
    const refreshToken =
      typeof body.refreshToken === "string" ? body.refreshToken : undefined;

    const refreshed = await refreshAuthTokens("v1", refreshToken);

    if (!refreshed) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      {
        message: error instanceof Error ? error.message : "Refresh failed",
      },
      { status: 401 },
    );
  }
}
