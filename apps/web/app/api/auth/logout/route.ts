import { NextResponse } from "next/server";

import { buildBackendApiUrl } from "@/entities/auth/lib/backend-url";
import { serverTokenStore } from "@/entities/auth/model/server-token-store";

export async function POST() {
  try {
    const accessToken = await serverTokenStore.getAccess();

    if (accessToken) {
      await fetch(buildBackendApiUrl("v1", "auth/logout"), {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }).catch(() => undefined);
    }

    await serverTokenStore.clear();

    return NextResponse.json({ ok: true });
  } catch (error) {
    await serverTokenStore.clear();

    return NextResponse.json(
      {
        message: error instanceof Error ? error.message : "Logout failed",
      },
      { status: 500 },
    );
  }
}
