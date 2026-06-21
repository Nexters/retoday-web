import { NextResponse } from "next/server";

import { serverTokenStore } from "@/entities/auth/model/server-token-store";

export async function GET() {
  const isLoggedIn = await serverTokenStore.hasRefresh();

  return NextResponse.json({ isLoggedIn });
}

export async function DELETE() {
  await serverTokenStore.clear();

  return NextResponse.json({ ok: true });
}
