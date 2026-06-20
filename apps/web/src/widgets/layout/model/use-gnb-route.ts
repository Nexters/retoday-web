import { useMemo } from "react";
import { usePathname, useSearchParams } from "next/navigation";

import { getSafeQueryDate } from "@/shared/lib/date/safe-query-date";
import { getTabPath } from "@/widgets/layout/lib/get-tab-path";

export function useGnbRoute() {
  const path = usePathname() ?? "/";
  const searchParams = useSearchParams();

  const date = getSafeQueryDate(searchParams?.get("date"));
  const tab = useMemo(() => getTabPath(path), [path]);

  return {
    tab,
    date,
  };
}
