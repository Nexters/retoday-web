"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLocale } from "@recap/i18n";

import { GNB_TABS, NAVIGATION_TAB } from "@/shared/config";
import { GnbTabs, GnbTabsList, GnbTabsTrigger } from "@/shared/ui";
import { useGnbRoute } from "@/widgets/layout/model/use-gnb-route";

const TabNavigation = () => {
  const router = useRouter();
  const { t } = useLocale("landing");
  const { tab, date } = useGnbRoute();

  const [currentTab, setCurrentTab] = useState<string | null>(null);

  useEffect(() => {
    setCurrentTab(currentTab);
  }, [currentTab]);

  return (
    <GnbTabs
      value={currentTab ?? tab}
      onValueChange={setCurrentTab}
      className="w-fit"
    >
      <GnbTabsList>
        {GNB_TABS.map(({ labelKey, value, path }) => (
          <GnbTabsTrigger key={value} value={value} asChild>
            <Link
              className="flex items-center justify-center"
              href={
                value === NAVIGATION_TAB.SETTINGS
                  ? path
                  : `${path}?date=${date}`
              }
              prefetch
              key={value}
              onMouseEnter={() => router.prefetch(path)}
              onFocus={() => router.prefetch(path)}
            >
              {t(`navigation.${labelKey}`)}
            </Link>
          </GnbTabsTrigger>
        ))}
      </GnbTabsList>
    </GnbTabs>
  );
};

export default TabNavigation;
