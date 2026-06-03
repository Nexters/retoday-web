import type { RecapData } from "@recap/api";
import { useLocale } from "@recap/i18n";
import { formatDuration, formatTimeRange } from "@recap/lib";

import RecapImg from "@/shared/assets/imgs/recap-img.png";
import { Divider } from "@/shared/ui";

const TodayRecapSection = ({ recap }: { recap: RecapData }) => {
  const { t } = useLocale("ai-recap");

  const detail = recap.recap;
  const timelines = recap.timelines ?? [];
  const totalScreenTime = timelines.reduce(
    (acc, timeline) => acc + timeline.duration,
    0,
  );

  const title = detail?.title?.trim() || "-";

  return (
    <div className="bg-white pt-4 px-5">
      <div className="space-y-2">
        <p className="text-subtitle-2-rg text-gray-800">
          {t("screenTime.todayRecapTitle")}
        </p>
        <h2 className="text-headline-sb text-gray-900">{title}</h2>
      </div>
      <div className="flex justify-center mt-4">
        <div className="flex flex-col w-full max-w-md max-h-[600px]">
          <img
            src={detail?.image ?? RecapImg}
            className="h-auto rounded-t-[0.75rem] w-full object-contain"
          />
          <div className="flex items-center w-full bg-gray-75 rounded-b-[0.75rem]">
            <div className="flex flex-1 flex-col py-3 pl-4 gap-1">
              <p className="text-label-2 text-gray-500">
                {t("todayRecap.totalScreenTimeLabel")}
              </p>
              <p className="text-body-2 text-gray-900">
                {formatDuration(totalScreenTime, t)}
              </p>
            </div>
            <Divider className="w-0.5 h-12 mx-4" />
            <div className="flex flex-1 flex-col py-3 pl-4 gap-1">
              <p className="text-label-2 text-gray-500">
                {t("todayRecap.measurementTimeLabel")}
              </p>
              <p className="text-body-2 text-gray-900">
                {formatTimeRange(detail?.startedAt, detail?.closedAt) || "-"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodayRecapSection;
