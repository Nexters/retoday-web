import type { NormalizedRecap } from "@/app/ai-recap/src/types/recap";

const TopVisitedTopics = ({ recap }: { recap: NormalizedRecap }) => {
  const topKeywords = recap.topics.slice(0, 3).map((topic) => topic.keyword);
  const topicCards = recap.topics.slice(0, 3);
  const keywordStyles = [
    "bg-gradient-04 text-heading-sb mt-5 ml-10 w-fit -rotate-[9.41deg] rounded-full border-8 border-solid border-white px-9 py-3 text-center text-white whitespace-nowrap",
    "bg-gradient-05 text-heading-sb w-fit rotate-[11.17deg] rounded-full border-8 border-solid border-white px-9 py-3 text-center text-white whitespace-nowrap",
    "bg-gradient-06 text-heading-sb w-fit -rotate-[10.56deg] rounded-full border-8 border-solid border-white px-9 py-3 text-center text-white whitespace-nowrap",
  ];

  return (
    <div className="rounded-[1.25rem] bg-white px-9 py-8">
      <p className="text-heading-rg text-gray-800">많이 둘러본 주제</p>

      <div className="mt-6 grid h-74 grid-cols-4 gap-4">
        <div className="relative overflow-hidden rounded-[1.25rem] bg-blue-50 px-6.5 py-6">
          {topKeywords.length === 0 ? (
            <p className="text-body-1 text-gray-500">주제 데이터가 없어요</p>
          ) : (
            <>
              {topKeywords.map((keyword, index) => (
                <div
                  key={`${keyword}-${index}`}
                  className={keywordStyles[index % keywordStyles.length]}
                >
                  #{keyword}
                </div>
              ))}
            </>
          )}
        </div>

        {topicCards.length === 0
          ? Array.from({ length: 3 }, (_, index) => (
              <div key={index} className="bg-gray-75 rounded-xl px-6.5 py-6">
                <h3 className="text-heading-md text-gray-900">-</h3>
                <p className="text-body-1 mt-4 whitespace-pre-line text-gray-500">
                  주제 데이터가 없어요
                </p>
              </div>
            ))
          : topicCards.map((topic, index) => (
              <div key={index} className="bg-gray-75 rounded-xl px-6.5 py-6">
                <h3 className="text-heading-md text-gray-900">{topic.title}</h3>
                <p className="text-body-1 mt-4 whitespace-pre-line text-gray-900">
                  {topic.content}
                </p>
              </div>
            ))}
      </div>
    </div>
  );
};

export default TopVisitedTopics;
