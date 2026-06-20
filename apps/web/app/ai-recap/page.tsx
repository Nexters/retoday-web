import { Suspense } from "react";

import AuthBoundary from "@/entities/auth/ui/AuthBoundary";
import { serverAiRecapQueryOptions } from "@/features/ai-recap/api/ai-recap-query.server";
import { AiRecapPage } from "@/pages/ai-recap/ui";
import AiRecapLoadingPage from "@/pages/ai-recap/ui/AiRecapLoadingPage";
import AiRecapUnloginPage from "@/pages/ai-recap/ui/AiRecapUnloginPage";
import { getSafeQueryDate } from "@/shared/lib/date/safe-query-date";
import FetchBoundary from "@/shared/lib/query/FetchBoundary";

type AIRecapRouteProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function Page({ searchParams }: AIRecapRouteProps) {
  const sp = searchParams ? await searchParams : {};

  const rawDate = sp.date;
  const dateParam = Array.isArray(rawDate) ? rawDate[0] : rawDate;

  const date = getSafeQueryDate(dateParam);

  return (
    <AuthBoundary
      fallback={<AiRecapUnloginPage />}
      loading={<AiRecapLoadingPage />}
    >
      <Suspense fallback={<AiRecapLoadingPage />}>
        <FetchBoundary queries={[serverAiRecapQueryOptions(date)]}>
          <AiRecapPage date={date} />
        </FetchBoundary>
      </Suspense>
    </AuthBoundary>
  );
}
