import { proxyBackendRequest } from "@/entities/auth/lib/proxy-backend-request";

type RouteContext = {
  params: Promise<{ path: string[] }>;
};

async function handler(req: Request, context: RouteContext) {
  const { path } = await context.params;
  return proxyBackendRequest(req, path);
}

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const PATCH = handler;
export const DELETE = handler;
