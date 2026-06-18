import { Suspense } from "react";

import { AiRecapPage } from "@/pages/ai-recap/ui";
import AiRecapLoadingPage from "@/pages/ai-recap/ui/AiRecapLoadingPage";
import { getSafeQueryDate } from "@/shared/lib/date/safe-query-date";

type AIRecapRouteProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function Page({ searchParams }: AIRecapRouteProps) {
  const sp = searchParams ? await searchParams : {};

  const rawDate = sp.date;
  const dateParam = Array.isArray(rawDate) ? rawDate[0] : rawDate;

  const date = getSafeQueryDate(dateParam);

  return (
    <Suspense fallback={<AiRecapLoadingPage />}>
      <AiRecapPage date={date} />
    </Suspense>
  );
}
