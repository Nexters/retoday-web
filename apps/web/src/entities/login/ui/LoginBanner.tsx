"use client";

import { useLocale } from "@recap/i18n";
import { Card, CardContent, CardDescription, CardTitle, Flex } from "@recap/ui";

import LoginButton from "@/entities/login/ui/LoginButton";

const LoginBanner = () => {
  const { t } = useLocale("settings");

  return (
    <Card className="bg-blue-75 flex w-full flex-col flex-nowrap gap-0 rounded-[1.25rem] px-5 py-5 shadow-none md:px-6 md:py-6 xl:px-9 xl:py-8">
      <CardContent className="flex min-w-0 flex-1 flex-col gap-0 p-0">
        <Flex
          direction="column"
          gap="none"
          className="w-full gap-3 md:flex-row md:flex-nowrap md:items-center md:justify-between md:gap-4"
        >
          <div className="min-w-0 flex-1">
            <CardTitle className="text-subtitle-1-sb md:text-display-3 m-0 text-left leading-tight text-gray-800">
              {t("account.dailyRecordsPrompt")}
            </CardTitle>
          </div>

          <div className="w-full shrink-0 md:w-auto">
            <LoginButton className="w-full justify-center md:w-auto md:justify-start" />
          </div>
        </Flex>

        <CardDescription className="text-body-2 md:text-heading-rg m-0 mt-2 text-left text-gray-800">
          {t("account.sampleDataCaption")}
        </CardDescription>
      </CardContent>
    </Card>
  );
};

export default LoginBanner;
