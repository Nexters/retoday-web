"use client";

import { useMemo } from "react";
import type { AiRecapTopic } from "@recap/api";
import { useLocale } from "@recap/i18n";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  cn,
  Item,
  ItemGroup,
} from "@recap/ui";

import TopicCardItem from "@/features/ai-recap/ui/TopicCardItem";

const KEYWORD_STYLES = [
  "bg-gradient-04 mt-5 ml-10 -rotate-[9.41deg]",
  "bg-gradient-05 rotate-[11.17deg]",
  "bg-gradient-06 -rotate-[10.56deg]",
] as const;

const KEYWORD_BASE_STYLE =
  "text-heading-sb w-fit rounded-full border-8 border-solid border-white px-9 py-3 text-center text-white whitespace-nowrap shadow-none";

const TOPIC_PLACEHOLDER_COUNT = 3;

const TopVisitedTopics = ({ topics }: { topics: AiRecapTopic[] }) => {
  const { t } = useLocale("ai-recap");

  const topKeywords = useMemo(
    () => topics.slice(0, 3).map((topic) => topic.keyword),
    [topics],
  );
  const topicCards = useMemo(() => topics.slice(0, 3), [topics]);
  const isEmpty = topicCards.length === 0;

  const topicItems = isEmpty
    ? Array.from({ length: TOPIC_PLACEHOLDER_COUNT }, (_, index) => (
        <TopicCardItem
          key={index}
          title="-"
          content={t("todayRecap.topicsEmpty")}
          isPlaceholder
          className={cn("min-w-0 md:flex-1", index === 2 && "col-span-2")}
        />
      ))
    : topicCards.map((topic, index) => (
        <TopicCardItem
          key={`${topic.title}-${index}`}
          title={topic.title}
          content={topic.content}
          className={cn("min-w-0 md:flex-1", index === 2 && "col-span-2")}
        />
      ));

  return (
    <Card className="gap-0 rounded-[1.25rem] bg-white px-5 py-5 shadow-none md:px-6 md:py-6 xl:px-9 xl:py-8">
      <CardHeader className="gap-0 p-0">
        <CardTitle className="text-heading-rg text-gray-800">
          {t("todayRecap.mostViewedTopicsTitle")}
        </CardTitle>
      </CardHeader>

      <CardContent className="mt-6 flex flex-col gap-4 p-0 md:h-73.75 md:flex-row">
        {/* 키워드 배치는 화면 크기와 무관하게 고정하고, 영역 중앙에 둔다. */}
        <Item className="relative h-73.75 w-full min-w-0 flex-col items-center justify-center overflow-hidden rounded-[1.25rem] border-0 bg-blue-50 px-6.5 py-6 shadow-none md:h-full md:w-auto md:flex-1">
          {topKeywords.length === 0 ? (
            <p className="text-body-1 text-gray-500">
              {t("todayRecap.topicsEmpty")}
            </p>
          ) : (
            <ItemGroup className="w-fit gap-0">
              {topKeywords.map((keyword, index) => (
                <Item
                  key={`${keyword}-${index}`}
                  className={cn(
                    KEYWORD_BASE_STYLE,
                    KEYWORD_STYLES[index % KEYWORD_STYLES.length],
                  )}
                >
                  #{keyword}
                </Item>
              ))}
            </ItemGroup>
          )}
        </Item>

        <div className="grid grid-cols-2 gap-4 md:contents">{topicItems}</div>
      </CardContent>
    </Card>
  );
};

export default TopVisitedTopics;
