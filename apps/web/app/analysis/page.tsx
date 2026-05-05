import { AnalysisPage } from "@/pages/analysis/ui";
import { getSafeQueryDate } from "@/shared/lib/date/safe-query-date";

type AnalysisRouteProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function Page({ searchParams }: AnalysisRouteProps) {
  const sp = searchParams ? await searchParams : {};

  const rawDate = sp.date;
  const dateParam = Array.isArray(rawDate) ? rawDate[0] : rawDate;

  const date = getSafeQueryDate(dateParam);

  return <AnalysisPage date={date} />;
}
