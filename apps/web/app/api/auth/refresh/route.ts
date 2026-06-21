import { NextResponse } from "next/server";

import { refreshAuthTokens } from "@/entities/auth/lib/refresh-auth-tokens";

export async function POST() {
  try {
    const refreshed = await refreshAuthTokens();

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
