import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
  AccordionTrigger,
  Badge,
} from "@recap/ui";

import Icon from "@/components/Icon";
import type { AnalysisCategoryItem } from "@/entities/analysis/model/analysis.type";
import CategoryLink from "@/features/analysis/components/CategoryLink";
import { formatDuration } from "@/utils/date";

const CategoryAnalysisItem = ({
  categoryName,
  stayDuration,
  websiteAnalyses,
  count,
}: AnalysisCategoryItem & { count: number }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <Accordion
      type="single"
      collapsible
      value={isOpen ? "item-1" : ""}
      onValueChange={(value) => setIsOpen(value === "item-1")}
    >
      <AccordionItem value="item-1">
        <AccordionHeader className="w-full">
          <AccordionTrigger className="w-full">
            <div className="w-full pt-2 pb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge className="size-4.5 rounded-full text-sm font-semibold bg-gray-100 text-gray-600 flex items-center justify-center p-0">
                  {count}
                </Badge>
                <p className="text-subtitle-2-sb text-gray-900">
                  {categoryName}
                </p>
                <p className="text-subtitle-2-rg text-gray-800">
                  {formatDuration(stayDuration)}
                </p>
              </div>
              <Icon
                name={isOpen ? "arrow-up" : "arrow-down"}
                className="w-4 h-4"
              />
            </div>
          </AccordionTrigger>
        </AccordionHeader>
        <AccordionContent className="flex flex-col gap-1">
          {websiteAnalyses.map((website, idx) => (
            <CategoryLink key={idx} {...website} />
          ))}
          <div className="flex items-center justify-center py-3">
            <p className="text-caption-1 text-gray-500 w-full text-center">
              더 자세한 내역은 대시보드에서 확인해주세요
            </p>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default CategoryAnalysisItem;
