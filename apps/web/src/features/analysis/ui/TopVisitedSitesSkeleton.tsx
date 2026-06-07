import {
  Card,
  CardContent,
  CardHeader,
  Item,
  ItemActions,
  ItemContent,
  ItemGroup,
  Skeleton,
} from "@recap/ui";

const TOP_VISITED_SITE_ROW_COUNT = 5;

const TopVisitedSitesSkeleton = () => (
  <Card className="gap-0 rounded-[1.25rem] bg-white p-5 shadow-none md:p-6 xl:p-10">
    <CardHeader className="gap-0 p-0">
      <Skeleton className="h-5 w-36" />
    </CardHeader>

    <CardContent className="mt-5 p-0 md:mt-6">
      <ItemGroup className="gap-2">
        {Array.from({ length: TOP_VISITED_SITE_ROW_COUNT }, (_, index) => (
          <Item
            key={index}
            className="bg-gray-75 flex-nowrap items-center justify-between gap-2 rounded-full border-0 p-2 shadow-none"
          >
            <ItemContent className="min-w-0 flex-1 flex-row items-center gap-3">
              <Skeleton className="size-6 shrink-0 rounded-full" />
              <Skeleton className="h-4 w-40" />
            </ItemContent>

            <ItemActions className="ml-2 shrink-0 gap-0">
              <Skeleton className="h-4 w-12" />
            </ItemActions>
          </Item>
        ))}
      </ItemGroup>
    </CardContent>
  </Card>
);

export default TopVisitedSitesSkeleton;
