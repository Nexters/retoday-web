import { Skeleton } from "@recap/ui";

import { Divider } from "@/shared/ui";

const CategoryAnalysisSectionSkeleton = () => {
  return (
    <div className="bg-white pt-8 px-5 pb-11">
      <div className="space-y-1">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-7 w-64" />
      </div>

      <div className="mt-6">
        <Skeleton className="h-[230px] w-full rounded-xl" />
      </div>

      <div className="mt-4 space-y-0">
        {[1, 2, 3].map((idx) => (
          <div key={idx}>
            <div className="pt-2 pb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Skeleton className="size-4.5 rounded-full" />
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-5 w-16" />
              </div>
              <Skeleton className="w-4 h-4" />
            </div>
            {idx !== 3 && <Divider className="h-0.5" />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryAnalysisSectionSkeleton;
