import { AiRecapPage } from "@/pages/ai-recap/ui";
import { getSafeQueryDate } from "@/shared/lib/date/safe-query-date";

type AIRecapRouteProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function Page({ searchParams }: AIRecapRouteProps) {
  const sp = searchParams ? await searchParams : {};

  const rawDate = sp.date;
  const dateParam = Array.isArray(rawDate) ? rawDate[0] : rawDate;

  const date = getSafeQueryDate(dateParam);

  return <AiRecapPage date={date} />;
}
