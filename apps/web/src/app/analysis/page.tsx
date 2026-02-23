import CategoryAnalysis from "@/app/analysis/src/components/CategoryAnalysis";
import ScreenTime from "@/app/analysis/src/components/ScreenTime";
import TodayTimeThief from "@/app/analysis/src/components/TodayTimeThief";
import TopVisitedSites from "@/app/analysis/src/components/TopVisitedSites";
import WorkPattern from "@/app/analysis/src/components/WorkPattern";
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

  return (
    <>
      <ScreenTime date={date} />
      <CategoryAnalysis date={date} />
      <div className="grid grid-cols-2 gap-7">
        <WorkPattern date={date} />
        <TodayTimeThief date={date} />
      </div>
      <TopVisitedSites date={date} />
    </>
  );
}
