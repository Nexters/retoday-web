import { NextResponse } from "next/server";

import { refreshAuthTokens } from "@/entities/auth/lib/refresh-auth-tokens";
import { serverTokenStore } from "@/entities/auth/model/server-token-store";

export async function POST() {
  const refreshToken = await serverTokenStore.getRefresh();

  if (!refreshToken) {
    return NextResponse.json(
      { message: "Refresh token not found" },
      { status: 401 },
    );
  }

  const tokens = await refreshAuthTokens(refreshToken);

  if (!tokens) {
    await serverTokenStore.clear();

    return NextResponse.json({ message: "Refresh failed" }, { status: 401 });
  }

  await serverTokenStore.set(tokens);

  return NextResponse.json(tokens);
}
