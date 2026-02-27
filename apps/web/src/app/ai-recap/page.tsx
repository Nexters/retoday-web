import Recap from "@/app/ai-recap/src/components/Recap";
import { getSafeQueryDate } from "@/lib/date/safe-query-date";

type AIRecapPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function AIRecapPage({ searchParams }: AIRecapPageProps) {
  const sp = searchParams ? await searchParams : {};

  const rawDate = sp.date;
  const dateParam = Array.isArray(rawDate) ? rawDate[0] : rawDate;

  const date = getSafeQueryDate(dateParam);

  return <Recap date={date} />;
}
