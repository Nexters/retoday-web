import type { AiRecapTopic } from "@/features/ai-recap/model/ai-recap.type";

const TodayTopicsSection = ({ topics }: { topics: AiRecapTopic[] }) => {
  return (
    <div className="py-8 px-5">
      <p className="text-subtitle-2-rg text-gray-800">오늘의 주제</p>

      <div className="flex justify-center mt-4">
        <div className="relative h-60 w-full max-w-md overflow-hidden rounded-xl bg-blue-50 px-6 py-6">
          <div className="w-[200px] bg-gradient-04 text-heading-sb absolute left-[calc(50%-2.9rem)] top-6 -rotate-[9.41deg] rounded-full border-8 border-white py-3 text-center text-white whitespace-nowrap">
            #{topics[0]?.keyword ?? "-"}
          </div>
          <div className="w-[220px] bg-gradient-05 text-heading-sb absolute left-[calc(50%-10.9rem)] top-20 rotate-[11.17deg] rounded-full border-8 border-white py-3 text-center text-white whitespace-nowrap">
            #{topics[1]?.keyword ?? "-"}
          </div>
          <div className="w-[220px] bg-gradient-06 text-heading-sb absolute left-[calc(50%-2.9rem)] top-32 -rotate-[10.56deg] rounded-full border-8 border-white py-3 text-center text-white whitespace-nowrap">
            #{topics[2]?.keyword ?? "-"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodayTopicsSection;
