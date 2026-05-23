"use client";

import { useLocale } from "@recap/i18n";

import LoginButton from "@/entities/login/ui/LoginButton";

const LoginBanner = () => {
  const { t } = useLocale("settings");

  return (
    <div className="bg-blue-75 rounded-[1.25rem] px-5 py-5 md:px-6 md:py-6 xl:px-9 xl:py-8">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between md:gap-4">
        <h2 className="text-subtitle-1-sb md:text-display-3 leading-tight text-gray-800">
          {t("account.dailyRecordsPrompt")}
        </h2>

        <LoginButton className="w-full justify-center md:w-auto md:justify-start" />
      </div>
      <p className="text-body-2 md:text-heading-rg mt-2 text-gray-800">
        {t("account.sampleDataCaption")}
      </p>
    </div>
  );
};

export default LoginBanner;
