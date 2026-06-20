import { NextResponse } from "next/server";

import { serverTokenStore } from "@/entities/auth/model/server-token-store";

export async function GET() {
  const isLoggedIn = await serverTokenStore.hasRefresh();

  if (!isLoggedIn) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const oAuthToken = await serverTokenStore.getOAuth();

  if (!oAuthToken) {
    return NextResponse.json(
      { message: "OAuth token not found" },
      { status: 404 },
    );
  }

  return NextResponse.json({ oAuthToken });
}
