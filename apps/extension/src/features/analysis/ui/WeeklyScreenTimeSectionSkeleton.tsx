import { Skeleton } from "@recap/ui";

const WeeklyScreenTimeSectionSkeleton = () => {
  return (
    <div className="w-full bg-white flex flex-col py-4 px-5">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-7 w-32 mt-2" />
        </div>
        <div className="flex gap-1">
          <Skeleton className="h-9 w-16 rounded-l-xl" />
          <Skeleton className="h-9 w-16 rounded-r-xl" />
        </div>
      </div>

      <div className="h-6" />

      <div className="mt-20 h-[100px]" />
    </div>
  );
};

export default WeeklyScreenTimeSectionSkeleton;
