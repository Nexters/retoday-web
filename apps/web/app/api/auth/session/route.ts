import { NextResponse } from "next/server";

import { serverTokenStore } from "@/entities/auth/model/server-token-store";

export async function GET() {
  const tokens = await serverTokenStore.get();
  const isLoggedIn = Boolean(tokens.refreshToken);

  if (!isLoggedIn) {
    return NextResponse.json({ isLoggedIn: false });
  }

  return NextResponse.json({
    isLoggedIn: true,
    accessToken: tokens.accessToken,
    refreshToken: tokens.refreshToken,
  });
}

export async function DELETE() {
  await serverTokenStore.clear();

  return NextResponse.json({ ok: true });
}
