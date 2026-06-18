import { serverAiRecapQueryOptions } from "@/features/ai-recap/api/ai-recap-query.server";
import AiRecapContent from "@/features/ai-recap/ui/AiRecapContent";
import FetchBoundary from "@/shared/lib/query/FetchBoundary";

const AiRecapPage = async ({ date }: { date: string }) => {
  return (
    <FetchBoundary queries={[serverAiRecapQueryOptions(date)]}>
      <AiRecapContent date={date} />
    </FetchBoundary>
  );
};

export default AiRecapPage;
