import {
  Card,
  CardContent,
  CardHeader,
  Item,
  ItemContent,
  ItemGroup,
  Skeleton,
} from "@recap/ui";

const WORK_PATTERN_ROW_COUNT = 4;

const WorkPatternSkeleton = () => (
  <Card className="gap-0 rounded-[1.25rem] bg-white p-5 shadow-none md:p-6 xl:p-10">
    <CardHeader className="gap-0 p-0">
      <Skeleton className="h-5 w-32" />
      <Skeleton className="mt-2 h-7 w-24" />
    </CardHeader>

    <CardContent className="mt-6 p-0 md:mt-7 xl:mt-8">
      <ItemGroup className="gap-4 md:gap-5">
        {Array.from({ length: WORK_PATTERN_ROW_COUNT }, (_, index) => (
          <Item
            key={index}
            className="flex-nowrap items-center gap-5 rounded-none border-0 bg-transparent p-0 shadow-none"
          >
            <Skeleton className="size-7 shrink-0 rounded-full" />
            <ItemContent className="min-w-0 flex-1 flex-row">
              <Skeleton className="h-2 w-full rounded-full" />
            </ItemContent>
          </Item>
        ))}
      </ItemGroup>
    </CardContent>
  </Card>
);

export default WorkPatternSkeleton;
