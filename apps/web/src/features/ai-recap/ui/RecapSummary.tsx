"use client";

import Image from "next/image";
import { useLocale } from "@recap/i18n";

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
    <div className="rounded-[1.25rem] bg-white">
      <div className="p-10">
        <div className="flex items-end justify-between">
          <div className="space-y-2">
            <p className="text-heading-md text-blue-400">
              {t("screenTime.todayRecapTitle")}
            </p>
            <h2 className="text-display-2 text-gray-900">{title}</h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-42 space-y-1">
              <p className="text-subtitle-2-rg text-gray-500">
                {t("todayRecap.totalScreenTimeLabel")}
              </p>
              <p className="text-heading-rg text-gray-900">
                {formatScreenTime(tc, totalMinutes)}
              </p>
            </div>

            <div className="h-18 w-px bg-gray-200" />

            <div className="w-42 space-y-1">
              <p className="text-subtitle-2-rg text-gray-500">
                {t("todayRecap.measurementTimeLabel")}
              </p>
              <p className="text-heading-rg text-gray-900">
                {formatMeasuredRange(tc, recap.startedAt, recap.closedAt)}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 flex items-center gap-4 rounded-full bg-blue-50 px-2.5 py-2">
          <div className="flex items-center gap-2">
            <AIRecapIcon />
            <p className="text-subtitle-1-sb text-gray-900">
              {t("todayRecap.dailySummaryLabel")}
            </p>
          </div>

          <p className="text-body-2 text-gray-800">{summary}</p>
        </div>
      </div>

      <div className="grid grid-cols-[1fr_464px] border-t border-solid border-gray-100">
        <div>
          {sections.length === 0 ? (
            <div className="pt-6 pr-9 pb-13 pl-10">
              <p className="text-body-1 text-gray-500">
                {t("todayRecap.summarySectionsEmpty")}
              </p>
            </div>
          ) : (
            sections.map((section, index) => (
              <div
                key={`${section.title}-${index}`}
                className={
                  index === 0
                    ? "pt-6 pr-9 pb-13 pl-10"
                    : "border-t border-solid border-gray-200 pt-6 pr-9 pb-13 pl-10"
                }
              >
                <p className="text-subtitle-2-sb text-gray-500">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <p className="text-headline-sb mt-1 text-gray-900">
                  {section.title}
                </p>
                <p className="text-body-1 mt-4 text-gray-900">
                  {section.content}
                </p>
              </div>
            ))
          )}
        </div>

        <Image
          src={recap?.imageUrl ?? RecapImg}
          alt="recapImg"
          width={464}
          height={420}
        />
      </div>
    </div>
  );
};

export default RecapSummary;
