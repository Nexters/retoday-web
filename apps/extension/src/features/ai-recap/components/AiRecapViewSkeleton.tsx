import { Skeleton } from "@recap/ui";

import { Divider } from "@/components";

const TodayRecapSectionSkeleton = () => {
  return (
    <div className="bg-white pt-4 px-5">
      <div className="space-y-2">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-7 w-48" />
      </div>
      <div className="mt-4 rounded-[0.75rem] bg-gray-75 flex flex-col">
        <Skeleton className="w-full h-36 rounded-t-[0.75rem]" />
        <div className="flex items-center">
          <div className="flex flex-1 flex-col py-3 pl-4 gap-1">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-5 w-24" />
          </div>
          <Divider className="w-0.5 h-12 mx-4" />
          <div className="flex flex-1 flex-col py-3 pl-4 gap-1">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-5 w-24" />
          </div>
        </div>
      </div>
    </div>
  );
};

const TodayRecapDetailSkeleton = () => {
  return (
    <>
      <div className="pt-4 px-6 pb-6">
        <Skeleton className="h-5 w-8" />
        <Skeleton className="h-6 w-48 mt-1" />
        <Skeleton className="h-16 w-full mt-4" />
      </div>

      <Divider className="h-[0.0625rem] w-full" />

      <div className="pt-4 px-6 pb-6">
        <Skeleton className="h-5 w-8" />
        <Skeleton className="h-6 w-48 mt-1" />
        <Skeleton className="h-16 w-full mt-4" />
      </div>
    </>
  );
};

const TodayTopicsSectionSkeleton = () => {
  return (
    <div className="py-8 px-5">
      <Skeleton className="h-5 w-24" />

      <div className="relative h-60 mt-4 overflow-hidden rounded-xl bg-gray-200">
        <Skeleton className="absolute left-24 top-6 w-24 h-12 rounded-full" />
        <Skeleton className="absolute left-2 top-20 w-28 h-12 rounded-full" />
        <Skeleton className="absolute left-23 top-36 w-32 h-12 rounded-full" />
      </div>
    </div>
  );
};

const AiRecapViewSkeleton = () => {
  return (
    <>
      <TodayRecapSectionSkeleton />
      <TodayRecapDetailSkeleton />
      <Divider />
      <TodayTopicsSectionSkeleton />
    </>
  );
};

export default AiRecapViewSkeleton;
