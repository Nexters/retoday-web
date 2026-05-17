"use client";

import { useLocale } from "@recap/i18n";
import { useQueryClient } from "@recap/react-query";

import { useAuth } from "@/entities/auth/ui";
import LoginButton from "@/features/login/ui/LoginButton";
import { USER_KEYS } from "@/features/settings/api/query-key.const";

const LoginBanner = () => {
  const { t } = useLocale("settings");
  const { refreshAuth } = useAuth();
  const queryClient = useQueryClient();

  const handleLoginSuccess = async () => {
    await queryClient.resetQueries({ queryKey: USER_KEYS.details() });
    await queryClient.invalidateQueries({ queryKey: USER_KEYS.details() });

    refreshAuth();
  };

  return (
    <div className="bg-blue-75 rounded-[1.25rem] px-5 py-5 md:px-6 md:py-6 xl:px-9 xl:py-8">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between md:gap-4">
        <h2 className="text-subtitle-1-sb md:text-display-3 leading-tight text-gray-800">
          {t("account.dailyRecordsPrompt")}
        </h2>

        <LoginButton
          onLoginSuccess={handleLoginSuccess}
          className="w-full justify-center md:w-auto md:justify-start"
        />
      </div>
      <p className="text-body-2 md:text-heading-rg mt-2 text-gray-800">
        {t("account.sampleDataCaption")}
      </p>
    </div>
  );
};

export default LoginBanner;
