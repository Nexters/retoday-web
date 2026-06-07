import { NextResponse } from "next/server";

import { getServerSession } from "@/entities/auth/model/get-server-session";

export async function GET() {
  const session = await getServerSession();

  return NextResponse.json(session);
}
