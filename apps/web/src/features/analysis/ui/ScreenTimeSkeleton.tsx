import { Card, CardAction, CardContent, CardHeader, Skeleton } from "@recap/ui";

const SCREEN_TIME_BAR_HEIGHTS = [40, 80, 55, 100, 70, 90, 45] as const;

const ScreenTimeSkeleton = () => (
  <Card className="flex w-full min-w-0 flex-col flex-nowrap items-stretch gap-0 rounded-[1.25rem] bg-white p-0 shadow-none xl:flex-row xl:flex-nowrap">
    <CardHeader className="flex w-full min-w-0 flex-col flex-nowrap gap-4 p-5 pb-6 md:flex-row md:flex-nowrap md:items-start md:justify-between md:p-6 md:pb-6 xl:h-auto xl:min-h-0 xl:w-auto xl:max-w-none xl:min-w-71.5 xl:flex-none xl:shrink-0 xl:grow-0 xl:basis-auto xl:p-10 xl:pb-10">
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <Skeleton className="h-5 w-36" />
        <Skeleton className="mt-2 h-7 w-28" />
      </div>

      <CardAction className="hidden w-auto shrink-0 md:flex xl:hidden">
        <div className="flex">
          <Skeleton className="h-9 w-16 rounded-l-xl" />
          <Skeleton className="h-9 w-16 rounded-r-xl" />
        </div>
      </CardAction>
    </CardHeader>

    <CardContent className="flex min-h-0 w-full min-w-0 flex-1 flex-col flex-nowrap gap-0 px-5 pt-0 pb-3 md:px-6 md:pb-4 xl:flex-1 xl:grow xl:basis-0 xl:px-6 xl:pt-10 xl:pb-3">
      <CardAction className="flex w-full min-w-0 justify-end gap-2 md:hidden xl:flex xl:justify-start">
        <div className="flex">
          <Skeleton className="h-9 w-16 rounded-l-xl" />
          <Skeleton className="h-9 w-16 rounded-r-xl" />
        </div>
      </CardAction>

      <div
        className="relative mt-6 w-full min-w-0 md:mt-7 xl:mt-12"
        style={{ height: 140 }}
      >
        <div className="flex h-full items-end justify-between gap-2">
          {SCREEN_TIME_BAR_HEIGHTS.map((height, index) => (
            <Skeleton
              key={index}
              className="flex-1 rounded-t-md"
              style={{ height }}
            />
          ))}
        </div>
      </div>
    </CardContent>
  </Card>
);

export default ScreenTimeSkeleton;
