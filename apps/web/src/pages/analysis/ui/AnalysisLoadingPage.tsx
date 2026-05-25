import { Grid, Skeleton, Stack } from "@recap/ui";

const AnalysisLoadingPage = () => {
  return (
    <Stack gap="none" className="gap-4 md:gap-5 xl:gap-7">
      <Skeleton className="h-80 w-full rounded-[1.25rem] bg-white md:h-96" />
      <Skeleton className="h-108 w-full rounded-[1.25rem] bg-white md:h-120" />
      <Grid
        cols={{ base: 1, md: 2 }}
        gap="none"
        className="gap-4 md:gap-5 xl:gap-7"
      >
        <Skeleton className="h-80 w-full rounded-[1.25rem] bg-white md:h-96" />
        <Skeleton className="h-80 w-full rounded-[1.25rem] bg-white md:h-96" />
      </Grid>
      <Skeleton className="h-88 w-full rounded-[1.25rem] bg-white md:h-96" />
    </Stack>
  );
};

export default AnalysisLoadingPage;
