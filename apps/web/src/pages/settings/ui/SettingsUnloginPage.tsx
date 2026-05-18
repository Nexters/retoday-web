"use client";

import { useLocale } from "@recap/i18n";
import { useQueryClient } from "@recap/react-query";

import { useAuth } from "@/entities/auth/ui";
import LoginButton from "@/features/login/ui/LoginButton";
import { USER_KEYS } from "@/features/settings/api/query-key.const";
import ExcludedDomainSection from "@/features/settings/ui/ExcludedDomainSection";
import LanguageSection from "@/features/settings/ui/LanguageSection";

const SettingsUnloginPage = () => {
  const { t } = useLocale("settings");
  const { refreshAuth } = useAuth();
  const queryClient = useQueryClient();

  const handleLoginSuccess = async () => {
    await queryClient.resetQueries({ queryKey: USER_KEYS.details() });
    await queryClient.invalidateQueries({ queryKey: USER_KEYS.details() });

    refreshAuth();
  };

  return (
    <>
      <div className="rounded-[1.25rem] bg-white px-5 py-5 md:px-6 md:py-6 xl:px-9 xl:py-8">
        <p className="text-body-1 text-gray-800">
          {t("account.dailyRecordsPrompt")}
        </p>

        <div className="my-6 h-px w-full bg-gray-200" />

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div className="size-14 rounded-full bg-gray-200" />
            <p className="text-headline-sb text-gray-800">
              {t("account.login")}
            </p>
          </div>

          <LoginButton onLoginSuccess={handleLoginSuccess} />
        </div>
      </div>

      <LanguageSection />
      <ExcludedDomainSection domains={[]} disabled />
    </>
  );
};

export default SettingsUnloginPage;
