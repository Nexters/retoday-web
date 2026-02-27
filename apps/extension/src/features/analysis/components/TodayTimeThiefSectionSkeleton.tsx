import { Skeleton } from "@recap/ui";

const TodayTimeThiefSectionSkeleton = () => {
  return (
    <div className="bg-white px-5 py-8">
      <div className="flex items-center justify-between">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-7 w-32 rounded-xl" />
      </div>

      <div className="mt-4 flex items-center justify-center">
        <div className="relative w-full max-w-xs">
          <Skeleton className="h-[280px] w-full rounded-xl" />
        </div>
      </div>
    </div>
  );
};

export default TodayTimeThiefSectionSkeleton;
