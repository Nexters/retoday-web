import Image from "next/image";

import type { NormalizedRecap } from "@/app/ai-recap/src/types/recap";
import AIRecapIcon from "@/assets/icons/recap-ai.svg";
import RecapImg from "@/assets/img/recap-1.png";

const formatScreenTime = (totalMinutes: number) => {
  if (totalMinutes <= 0) return "-";

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours <= 0) return `${minutes}분`;
  if (minutes <= 0) return `${hours}시간`;
  return `${hours}시간 ${minutes}분`;
};

const formatMeridiemTime = (value: Date) => {
  if (!(value instanceof Date) || Number.isNaN(value.getTime())) return null;

  const hour = value.getHours();
  const minute = value.getMinutes();
  const meridiem = hour < 12 ? "am" : "pm";
  const displayHour = hour % 12 === 0 ? 12 : hour % 12;

  if (minute === 0) {
    return `${displayHour}${meridiem}`;
  }

  return `${displayHour}:${String(minute).padStart(2, "0")}${meridiem}`;
};

const formatMeasuredRange = (startedAt: Date, closedAt: Date) => {
  const started = formatMeridiemTime(startedAt);
  const closed = formatMeridiemTime(closedAt);

  if (!started || !closed) return "-";
  return `${started} - ${closed}`;
};

const RecapSummary = ({ recap }: { recap: NormalizedRecap }) => {
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
            <p className="text-heading-md text-blue-400">Today’s Recap</p>
            <h2 className="text-display-2 text-gray-900">{title}</h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-42 space-y-1">
              <p className="text-subtitle-2-rg text-gray-500">총 스크린타임</p>
              <p className="text-heading-rg text-gray-900">
                {formatScreenTime(totalMinutes)}
              </p>
            </div>

            <div className="h-18 w-px bg-gray-200" />

            <div className="w-42 space-y-1">
              <p className="text-subtitle-2-rg text-gray-500">측정시간</p>
              <p className="text-heading-rg text-gray-900">
                {formatMeasuredRange(recap.startedAt, recap.closedAt)}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 flex items-center gap-4 rounded-full bg-blue-50 px-2.5 py-2">
          <div className="flex items-center gap-2">
            <AIRecapIcon />
            <p className="text-subtitle-1-sb text-gray-900">하루 요약</p>
          </div>

          <p className="text-body-2 text-gray-800">{summary}</p>
        </div>
      </div>

      <div className="grid grid-cols-[1fr_464px] border-t border-solid border-gray-100">
        <div>
          {sections.length === 0 ? (
            <div className="pt-6 pr-9 pb-13 pl-10">
              <p className="text-body-1 text-gray-500">요약된 내용이 없어요</p>
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

        <Image src={RecapImg} alt="recapImg" width={464} height={420} />
      </div>
    </div>
  );
};

export default RecapSummary;
