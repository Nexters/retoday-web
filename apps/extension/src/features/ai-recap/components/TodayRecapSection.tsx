import RecapImg from "@/assets/imgs/recap-img.png";
import Divider from "@/components/Divider";
import type { AiRecapResponse } from "@/entities/ai-recap/model/ai-recap.type";
import { formatDuration, formatTimeRange } from "@/utils/date";

const TodayRecapSection = ({
  title,
  imageUrl,
  startedAt,
  closedAt,
  timelines,
}: Partial<AiRecapResponse>) => {
  const totalScreenTime = timelines?.reduce(
    (acc, curr) => acc + curr.durationMinutes * 60,
    0,
  );
  return (
    <div className="bg-white pt-4 px-5">
      <div className="space-y-2">
        <p className="text-subtitle-2-rg text-gray-800">Today&apos;s Recap</p>
        <h2 className="text-headline-sb text-gray-900">{title ?? "-"}</h2>
      </div>
      <div className="mt-4 rounded-[0.75rem] bg-gray-75 flex flex-col">
        <img
          src={imageUrl ?? RecapImg}
          className="h-auto rounded-t-[0.75rem] w-full max-w-xs object-contain"
        />
        <div className="flex items-center">
          <div className="flex flex-1 flex-col py-3 pl-4 gap-1">
            <p className="text-label-2 text-gray-500">총 스크린타임</p>
            <p className="text-body-2 text-gray-900">
              {formatDuration(totalScreenTime ?? 0)}
            </p>
          </div>
          <Divider className="w-0.5 h-12 mx-4" />
          <div className="flex flex-1 flex-col py-3 pl-4 gap-1">
            <p className="text-label-2 text-gray-500">측정시간</p>
            <p className="text-body-2 text-gray-900">
              {formatTimeRange(startedAt, closedAt) ?? "-"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodayRecapSection;
