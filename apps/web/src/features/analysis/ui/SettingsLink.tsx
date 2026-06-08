"use client";

import Link from "next/link";
import { useLocale } from "@recap/i18n";

import ArrowRightBlueIcon from "@/shared/assets/icons/arrow-right-blue.svg";

const SettingsLink = () => {
  const { t } = useLocale("analysis");

  return (
    <Link
      href="/settings"
      className="text-subtitle-1-md mt-7 flex items-center justify-end gap-1 p-2 text-[#4378ff]"
    >
      {t("settings.addNonTrackingDomainLink")}
      <ArrowRightBlueIcon />
    </Link>
  );
};

export default SettingsLink;
