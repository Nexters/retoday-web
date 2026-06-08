import type { CategoryWebsiteAnalysis } from "@recap/api";
import { useLocale } from "@recap/i18n";
import { formatDuration } from "@recap/lib";

const CategoryLink = ({
  domain,
  faviconUrl,
  stayDuration,
}: CategoryWebsiteAnalysis) => {
  const { t } = useLocale("analysis");

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
        {formatDuration(stayDuration, t)}
      </p>
    </div>
  );
};

export default CategoryLink;
