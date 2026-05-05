import { useCallback, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { GNB_TABS } from "@/shared/config";
import { getTabPath } from "@/widgets/layout/lib/get-tab-path";

export function useGnbNavigation() {
  const router = useRouter();
  const path = usePathname() ?? "/";
  const searchParams = useSearchParams();

  const currentTab = useMemo(() => getTabPath(path), [path]);

  const onTabChange = useCallback(
    (next: string) => {
      const tab = GNB_TABS.find((t) => t.value === next);
      if (!tab) return;

      const qs = searchParams?.toString() ?? "";
      const url = qs ? `${tab.path}?${qs}` : tab.path;

      router.push(url, { scroll: false });
    },
    [router, searchParams],
  );

  return {
    currentTab,
    onTabChange,
  };
}
