import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";

export type CreateQueryClientOptions = {
  staleTimeMs?: number;
  gcTimeMs?: number;
  retry?: number | ((failureCount: number, error: unknown) => boolean);

  onError?: (error: unknown) => void;
  onQueryError?: (error: unknown) => void;
  onMutationError?: (error: unknown) => void;
};

export function getHttpStatus(error: unknown): number | undefined {
  if (error && typeof error === "object" && "status" in error) {
    const s = (error as { status?: unknown }).status;
    if (typeof s === "number") return s;
  }
  return undefined;
}

export function createQueryClient(opts?: CreateQueryClientOptions) {
  const staleTime = opts?.staleTimeMs ?? 30000;
  const gcTime = opts?.gcTimeMs ?? 10 * 60000;

  const onQueryError = opts?.onQueryError ?? opts?.onError;
  const onMutationError = opts?.onMutationError ?? opts?.onError;

  return new QueryClient({
    queryCache: new QueryCache({
      onError: (error) => {
        onQueryError?.(error);
      },
    }),
    mutationCache: new MutationCache({
      onError: (error) => {
        onMutationError?.(error);
      },
    }),
    defaultOptions: {
      queries: {
        staleTime,
        gcTime,
        refetchOnWindowFocus: false,
        refetchOnReconnect: true,
        refetchOnMount: false,
      },
    },
  });
}
