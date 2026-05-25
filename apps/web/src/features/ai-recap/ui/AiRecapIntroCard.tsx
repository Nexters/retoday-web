"use client";

import { useLocale } from "@recap/i18n";
import { Card, CardContent, CardHeader, Divider, Flex, Stack } from "@recap/ui";

const AiRecapIntroCard = () => {
  const { t } = useLocale("ai-recap");

  return (
    <Card className="flex w-full flex-col gap-0 rounded-[1.25rem] bg-white px-5 py-5 shadow-none md:px-6 md:py-6 xl:px-9 xl:py-8">
      <Flex
        direction="column"
        className="gap-4 md:flex-row md:items-end md:justify-between"
      >
        <CardHeader className="shrink-0 p-0">
          <Stack gap="none" className="gap-2">
            <p className="text-heading-md text-blue-400">
              {t("screenTime.todayRecapTitle")}
            </p>
            <h2 className="text-title-1 md:text-display-2 leading-tight text-gray-900">
              {t("screenTime.deliverRecapDailyNight")}
            </h2>
          </Stack>
        </CardHeader>

        <CardContent className="min-w-0 flex-1 p-0">
          <Flex
            align="flex-start"
            justify="space-between"
            wrap="wrap"
            className="gap-6 border-t border-solid border-gray-100 pt-4 md:flex-nowrap md:justify-start md:gap-8 md:border-0 md:pt-0"
          >
            <div className="flex w-auto min-w-26 shrink-0 flex-col gap-1 md:w-26">
              <p className="text-subtitle-2-rg m-0 p-0 text-gray-500">
                {t("screenTime.totalScreenTime")}
              </p>
              <p className="text-heading-rg m-0 text-gray-900">-</p>
            </div>
            <Divider orientation="vertical" />
            <div className="flex w-auto min-w-26 shrink-0 flex-col gap-1 md:w-26">
              <p className="text-subtitle-2-rg m-0 p-0 text-gray-500">
                {t("screenTime.measurementTime")}
              </p>
              <p className="text-heading-rg m-0 text-gray-900">-</p>
            </div>
          </Flex>
        </CardContent>
      </Flex>
    </Card>
  );
};

export { AiRecapIntroCard };
