"use client";

import Image from "next/image";
import { useLocale } from "@recap/i18n";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  cn,
  Divider,
  Flex,
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemTitle,
  Stack,
} from "@recap/ui";

import {
  formatMeasuredRange,
  formatScreenTime,
} from "@/features/ai-recap/lib/format-date";
import type { NormalizedRecap } from "@/features/ai-recap/model/recap.type";
import AIRecapIcon from "@/shared/assets/icons/recap-ai.svg";
import RecapImg from "@/shared/assets/img/recap-1.png";

const RecapSummary = ({ recap }: { recap: NormalizedRecap }) => {
  const { t } = useLocale("ai-recap");
  const { t: tc } = useLocale("common");

  const sections = recap.sections;
  const totalMinutes = recap.timelines.reduce(
    (sum, timeline) => sum + timeline.durationMinutes,
    0,
  );

  const title = recap.title.trim() || "-";
  const summary = recap.summary.trim() || "-";

  return (
    <Card className="gap-0 overflow-hidden rounded-[1.25rem] bg-white p-0 shadow-none">
      <CardHeader className="gap-0 p-10">
        <Flex
          direction="column"
          className="items-stretch gap-6 md:flex-row md:items-end md:justify-between"
        >
          <Stack gap="none" className="gap-2">
            <p className="text-heading-md text-blue-400">
              {t("screenTime.todayRecapTitle")}
            </p>
            <CardTitle className="text-display-2 text-gray-900">
              {title}
            </CardTitle>
          </Stack>

          <Flex align="flex-end" className="gap-4">
            <Stack gap="none" className="w-42 gap-1">
              <CardDescription className="text-subtitle-2-rg text-gray-500">
                {t("todayRecap.totalScreenTimeLabel")}
              </CardDescription>
              <p className="text-heading-rg m-0 text-gray-900">
                {formatScreenTime(tc, totalMinutes)}
              </p>
            </Stack>

            <Divider orientation="vertical" className="h-18" />

            <Stack gap="none" className="w-42 gap-1">
              <CardDescription className="text-subtitle-2-rg text-gray-500">
                {t("todayRecap.measurementTimeLabel")}
              </CardDescription>
              <p className="text-heading-rg m-0 text-gray-900">
                {formatMeasuredRange(tc, recap.startedAt, recap.closedAt)}
              </p>
            </Stack>
          </Flex>
        </Flex>

        <Item className="mt-12 flex-nowrap items-center gap-4 self-start rounded-full border-0 bg-blue-50 p-0 px-2.5 py-2 shadow-none">
          <ItemContent className="min-w-0 flex-1 flex-row flex-wrap items-center gap-4 p-0">
            <div className="flex shrink-0 items-center gap-2">
              <AIRecapIcon />
              <ItemTitle className="text-subtitle-1-sb text-gray-900">
                {t("todayRecap.dailySummaryLabel")}
              </ItemTitle>
            </div>

            <ItemDescription className="text-body-2 min-w-0 text-gray-800">
              {summary}
            </ItemDescription>
          </ItemContent>
        </Item>
      </CardHeader>

      <CardContent className="grid grid-cols-[1fr_464px] gap-0 border-t border-solid border-gray-100 p-0">
        {sections.length === 0 ? (
          <div className="pt-6 pr-9 pb-13 pl-10">
            <p className="text-body-1 text-gray-500">
              {t("todayRecap.summarySectionsEmpty")}
            </p>
          </div>
        ) : (
          <ItemGroup className="gap-0">
            {sections.map((section, index) => (
              <Item
                key={`${section.title}-${index}`}
                className={cn(
                  "flex-col items-stretch rounded-none border-0 bg-transparent p-0 pt-6 pr-9 pb-13 pl-10 shadow-none",
                  index > 0 && "border-t border-solid border-gray-200",
                )}
              >
                <ItemContent className="gap-0 p-0">
                  <ItemDescription className="text-subtitle-2-sb text-gray-500">
                    {String(index + 1).padStart(2, "0")}
                  </ItemDescription>
                  <ItemTitle className="text-headline-sb mt-1 text-gray-900">
                    {section.title}
                  </ItemTitle>
                  <p className="text-body-1 mt-4 text-gray-900">
                    {section.content}
                  </p>
                </ItemContent>
              </Item>
            ))}
          </ItemGroup>
        )}

        <Image
          src={recap.imageUrl ?? RecapImg}
          alt="recapImg"
          width={464}
          height={420}
        />
      </CardContent>
    </Card>
  );
};

export default RecapSummary;
