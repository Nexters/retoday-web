import { Skeleton, Stack } from "@recap/ui";

const AiRecapLoadingPage = () => {
  return (
    <Stack gap="none" className="gap-4 md:gap-5 xl:gap-7">
      <Skeleton className="h-80 w-full rounded-[1.25rem] bg-white md:h-96" />
      <Skeleton className="h-112 w-full rounded-[1.25rem] bg-white md:h-120" />
      <Skeleton className="h-74 w-full rounded-[1.25rem] bg-white" />
    </Stack>
  );
};

export default AiRecapLoadingPage;
