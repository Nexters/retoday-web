import { useCallback, useEffect, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { formatQueryDate, parseQueryDate } from "@/shared/lib/date";

type UseQueryDateOptions = {
  queryKey?: string;
  defaultDate?: Date;
};

const buildUrl = (path: string, params: URLSearchParams) => {
  const queryString = params.toString();

  return queryString ? `${path}?${queryString}` : path;
};

export function useQueryDate({
  queryKey = "date",
  defaultDate,
}: UseQueryDateOptions = {}) {
  const router = useRouter();
  const pathname = usePathname() ?? "/";
  const searchParams = useSearchParams();

  const queryString = searchParams?.toString() ?? "";

  const stableDefaultDate = useMemo(
    () => defaultDate ?? new Date(),
    [defaultDate],
  );

  const selectedDate = useMemo(() => {
    const params = new URLSearchParams(queryString);
    const dateFromQuery = parseQueryDate(params.get(queryKey));

    return dateFromQuery ?? stableDefaultDate;
  }, [queryString, queryKey, stableDefaultDate]);

  const onDateChange = useCallback(
    (date: Date | undefined) => {
      const nextDate = date ?? stableDefaultDate;
      const params = new URLSearchParams(queryString);

      params.set(queryKey, formatQueryDate(nextDate));

      router.push(buildUrl(pathname, params), {
        scroll: false,
      });
    },
    [pathname, queryKey, queryString, router, stableDefaultDate],
  );

  useEffect(() => {
    const params = new URLSearchParams(queryString);

    if (params.get(queryKey)) {
      return;
    }

    params.set(queryKey, formatQueryDate(stableDefaultDate));

    router.replace(buildUrl(pathname, params), {
      scroll: false,
    });
  }, [pathname, queryKey, queryString, router, stableDefaultDate]);

  return {
    selectedDate,
    onDateChange,
  };
}
