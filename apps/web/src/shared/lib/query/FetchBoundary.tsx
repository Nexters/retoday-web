import type { ReactNode } from "react";
import { createQueryClient, dehydrateState } from "@recap/react-query";
import {
  type FetchQueryOptions,
  HydrationBoundary,
} from "@tanstack/react-query";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FetchBoundaryProps<T extends FetchQueryOptions<any, Error, any, any>[]> = {
  queries: T;
  children: ReactNode;
};

async function FetchBoundary<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T extends FetchQueryOptions<any, Error, any, any>[],
>({ queries, children }: FetchBoundaryProps<T>) {
  const queryClient = createQueryClient();

  await Promise.all(queries.map((query) => queryClient.prefetchQuery(query)));

  return (
    <HydrationBoundary state={dehydrateState(queryClient)}>
      {children}
    </HydrationBoundary>
  );
}

export default FetchBoundary;
