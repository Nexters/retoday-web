import Divider from "@/components/Divider";
import type { AiRecapSection } from "@/entities/ai-recap/model/ai-recap.type";

const TodayRecapDetail = ({ sections }: { sections: AiRecapSection[] }) => {
  return (
    <>
      {sections.map((section, index) => (
        <>
          <div key={index} className="pt-4 px-6 pb-6">
            <p className="text-subtitle-2-sb text-gray-500">
              {index + 1 > 9 ? index + 1 : `0${index + 1}`}
            </p>
            <p className="text-subtitle-2-sb mt-1 text-gray-900">
              {section.title ?? "-"}
            </p>
            <p className="text-body-2 mt-4 text-gray-900">
              {section.content ?? "-"}
            </p>
          </div>
          {index < sections.length - 1 && (
            <Divider className="h-[0.0625rem] w-full" />
          )}
        </>
      ))}
    </>
  );
};

export default TodayRecapDetail;
