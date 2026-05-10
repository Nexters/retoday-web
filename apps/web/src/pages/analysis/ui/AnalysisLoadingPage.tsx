import { Skeleton } from "@recap/ui";

const AnalysisLoadingPage = () => {
  return (
    <div className="flex flex-col gap-4 md:gap-5 xl:gap-7">
      <Skeleton className="h-80 w-full rounded-[1.25rem] bg-white md:h-96" />
      <Skeleton className="h-108 w-full rounded-[1.25rem] bg-white md:h-120" />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 xl:gap-7">
        <Skeleton className="h-80 w-full rounded-[1.25rem] bg-white md:h-96" />
        <Skeleton className="h-80 w-full rounded-[1.25rem] bg-white md:h-96" />
      </div>
      <Skeleton className="h-88 w-full rounded-[1.25rem] bg-white md:h-96" />
    </div>
  );
};

export default AnalysisLoadingPage;
