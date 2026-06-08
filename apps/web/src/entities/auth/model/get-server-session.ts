import { serverTokenStore } from "@/entities/auth/model/server-token-store";

export async function getServerSession() {
  const isLoggedIn = await serverTokenStore.hasAccess();

  return { isLoggedIn };
}
