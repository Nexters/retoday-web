import type { AnalysisWebsite } from "@/entities/analysis/model/analysis.type";
import { formatDuration } from "@/utils/date";

const CategoryLink = ({
  domain,
  faviconUrl,
  stayDuration,
}: AnalysisWebsite) => {
  return (
    <div className="bg-gray-75 flex items-center justify-between rounded-full pl-2 pr-4 py-2">
      <div className="flex items-center gap-3">
        {faviconUrl ? (
          <img
            src={faviconUrl}
            alt={domain}
            className="size-6 rounded-full object-cover"
          />
        ) : (
          <div className="size-6 rounded-full bg-gray-300" />
        )}
        <p className="text-body-1 text-gray-500">{domain}</p>
      </div>

      <p className="text-body-1 text-gray-900">
        {formatDuration(stayDuration)}
      </p>
    </div>
  );
};

export default CategoryLink;
