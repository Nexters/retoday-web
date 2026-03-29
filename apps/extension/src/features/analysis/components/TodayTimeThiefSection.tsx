import TimeThiefImg from "@/assets/imgs/time-thief.png";
import { DATE_FORMAT } from "@/const";
import { useGetLongestWebSite } from "@/entities/analysis/queries/analysis-query";
import TodayTimeThiefSectionSkeleton from "@/features/analysis/components/TodayTimeThiefSectionSkeleton";
import { formatDate } from "@/utils/date";

const TodayTimeThiefSection = ({ selectedDate }: { selectedDate: Date }) => {
  const { data, isLoading } = useGetLongestWebSite(
    formatDate(selectedDate, DATE_FORMAT.YYYY_MM_DD_DASH),
  );

  if (isLoading) {
    return <TodayTimeThiefSectionSkeleton />;
  }
  return (
    <div className="bg-white px-5 py-8">
      <div className="flex items-center justify-between">
        <h2 className="text-subtitle-2-rg whitespace-nowrap text-gray-800">
          오늘의 시간 도둑
        </h2>

        <div className="bg-blue-75 text-label-1 flex items-center gap-2 w-fit rounded-xl px-3 py-1 text-gray-900">
          {data?.faviconUrl ? (
            <img
              src={data.faviconUrl}
              alt={data.domain}
              className="size-[14px] rounded-full object-cover"
            />
          ) : (
            <div className="size-[14px] rounded-full bg-gray-300" />
          )}

          {data?.domain}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-center">
        <div className="relative">
          <img
            src={TimeThiefImg}
            alt="시간 도둑"
            className="h-auto w-full max-w-xs object-contain"
          />

          {data?.faviconUrl ? (
            <img
              src={data.faviconUrl}
              alt={data.domain}
              className="absolute top-[60%] left-[70%] -translate-x-1/2 -translate-y-1/2 size-[120px] rounded-full object-cover"
            />
          ) : (
            <div className="absolute top-[60%] left-[70%] -translate-x-1/2 -translate-y-1/2 size-[120px] rounded-full bg-gray-300" />
          )}
        </div>
      </div>
    </div>
  );
};

export default TodayTimeThiefSection;
