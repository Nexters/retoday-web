import TimeThiefImg from "@/assets/imgs/time-thief.png";
import { DATE_FORMAT } from "@/const/date-format.const";
import { useGetFrequencyVisitedSites } from "@/entities/analysis/queries/analysis-query";
import { formatDate } from "@/utils/date";

const TodayTimeThiefSection = ({ selectedDate }: { selectedDate: Date }) => {
  const { data: websiteAnalysis } = useGetFrequencyVisitedSites(
    formatDate(selectedDate, DATE_FORMAT.YYYY_MM_DD_DASH),
    1,
    {
      select: (data) => data.websiteAnalyses[0],
    },
  );
  return (
    <div className="bg-white px-5 py-8">
      <div className="flex items-center justify-between">
        <h2 className="text-subtitle-2-rg whitespace-nowrap text-gray-800">
          오늘의 시간 도둑
        </h2>

        <div className="bg-blue-75 text-label-1 flex items-center gap-2 w-fit rounded-xl px-3 py-1 text-gray-900">
          {websiteAnalysis?.faviconUrl ? (
            <img
              src={websiteAnalysis.faviconUrl}
              alt={websiteAnalysis.domain}
              className="size-[14px] rounded-full object-cover"
            />
          ) : (
            <div className="size-[14px] rounded-full bg-gray-300" />
          )}

          {websiteAnalysis?.domain}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-center">
        <div className="relative">
          <img
            src={TimeThiefImg}
            alt="시간 도둑"
            className="h-auto w-full max-w-xs object-contain"
          />
          {websiteAnalysis?.faviconUrl ? (
            <img
              src={websiteAnalysis.faviconUrl}
              alt={websiteAnalysis.domain}
              className="absolute top-1/2 left-[60%] -translate-x-1/2 -translate-y-1/2 size-[120px] rounded-full object-cover"
            />
          ) : (
            <div className="absolute top-1/2 left-[60%] -translate-x-1/2 -translate-y-1/2 size-[120px] rounded-full bg-gray-300" />
          )}
        </div>
      </div>
    </div>
  );
};

export default TodayTimeThiefSection;
