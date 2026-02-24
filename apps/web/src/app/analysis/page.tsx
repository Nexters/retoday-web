import AnalysisGate from "@/app/analysis/src/components/AnalysisGate";
import { getSafeQueryDate } from "@/lib/date/safe-query-date";

type AnalysisPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function AnalysisPage({
  searchParams,
}: AnalysisPageProps) {
  const sp = searchParams ? await searchParams : {};

  const rawDate = sp.date;
  const dateParam = Array.isArray(rawDate) ? rawDate[0] : rawDate;

  const date = getSafeQueryDate(dateParam);

  return <AnalysisGate date={date} />;
}
