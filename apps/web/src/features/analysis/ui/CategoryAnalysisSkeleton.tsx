import { Card, CardContent, CardHeader, Skeleton } from "@recap/ui";

const RANKING_ROW_COUNT = 5;
const TOGGLE_COUNT = 4;

const CategoryAnalysisSkeleton = () => (
  <Card className="gap-0 rounded-[1.25rem] bg-white p-5 shadow-none md:p-6 xl:p-10">
    <CardHeader className="gap-0 p-0">
      <Skeleton className="h-5 w-32" />
      <Skeleton className="mt-2 h-7 w-64" />
    </CardHeader>

    <CardContent className="p-0">
      <Skeleton className="mt-6 h-56 w-full rounded-xl md:h-60" />

      <div className="mt-9 flex min-w-0 flex-wrap gap-2">
        {Array.from({ length: TOGGLE_COUNT }, (_, index) => (
          <Skeleton key={index} className="h-9 w-20 rounded-xl" />
        ))}
      </div>

      <div className="mt-5 grid grid-cols-1 gap-x-8 md:grid-cols-2">
        {Array.from({ length: RANKING_ROW_COUNT }, (_, index) => (
          <div
            key={index}
            className="flex min-w-0 flex-nowrap items-center justify-between gap-2 border-b border-gray-200 py-4"
          >
            <div className="flex min-w-0 flex-1 items-center gap-2">
              <Skeleton className="size-4.5 shrink-0 rounded-full" />
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-5 w-16" />
            </div>

            <div className="flex shrink-0">
              <Skeleton className="size-7 rounded-full" />
              <Skeleton className="-ml-1 size-7 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

export default CategoryAnalysisSkeleton;
