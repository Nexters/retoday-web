import { Card, CardAction, CardContent, CardHeader, Skeleton } from "@recap/ui";

const TodayTimeThiefSkeleton = () => (
  <Card className="gap-1 overflow-hidden rounded-[1.25rem] bg-white p-0 shadow-none">
    <CardHeader className="gap-3.5 p-5 pb-0 md:p-6 md:pb-0 xl:p-10 xl:pb-0">
      <div className="flex items-center justify-between gap-4">
        <Skeleton className="h-5 w-32" />
        <CardAction className="m-0 w-auto shrink-0">
          <Skeleton className="h-5 w-24" />
        </CardAction>
      </div>

      <Skeleton className="h-10 w-44 rounded-xl" />
    </CardHeader>

    <CardContent className="relative h-48 p-0 md:h-52 xl:h-54">
      <Skeleton className="absolute inset-0 rounded-none" />
    </CardContent>
  </Card>
);

export default TodayTimeThiefSkeleton;
