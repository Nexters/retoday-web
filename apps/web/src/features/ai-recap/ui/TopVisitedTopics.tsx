"use client";

import { useMemo } from "react";
import { useLocale } from "@recap/i18n";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  cn,
  Grid,
  Item,
  ItemGroup,
} from "@recap/ui";

import type { NormalizedRecap } from "@/features/ai-recap/model/recap.type";
import TopicCardItem from "@/features/ai-recap/ui/TopicCardItem";

const KEYWORD_STYLES = [
  "bg-gradient-04 text-heading-sb mt-5 ml-10 w-fit -rotate-[9.41deg] rounded-full border-8 border-solid border-white px-9 py-3 text-center text-white whitespace-nowrap",
  "bg-gradient-05 text-heading-sb w-fit rotate-[11.17deg] rounded-full border-8 border-solid border-white px-9 py-3 text-center text-white whitespace-nowrap",
  "bg-gradient-06 text-heading-sb w-fit -rotate-[10.56deg] rounded-full border-8 border-solid border-white px-9 py-3 text-center text-white whitespace-nowrap",
] as const;

const TOPIC_PLACEHOLDER_COUNT = 3;

const TopVisitedTopics = ({ recap }: { recap: NormalizedRecap }) => {
  const { t } = useLocale("ai-recap");

  const topics = recap.topics ?? [];

  const topKeywords = useMemo(
    () => topics.slice(0, 3).map((topic) => topic.keyword),
    [topics],
  );
  const topicCards = useMemo(() => topics.slice(0, 3), [topics]);
  const isEmpty = topicCards.length === 0;

  return (
    <Card className="gap-0 rounded-[1.25rem] bg-white px-9 py-8 shadow-none">
      <CardHeader className="gap-0 p-0">
        <CardTitle className="text-heading-rg text-gray-800">
          {t("todayRecap.mostViewedTopicsTitle")}
        </CardTitle>
      </CardHeader>

      <CardContent className="mt-6 p-0">
        <Grid cols={4} gap="none" className="h-74 gap-4">
          <Item className="relative flex-col items-stretch overflow-hidden rounded-[1.25rem] border-0 bg-blue-50 px-6.5 py-6 shadow-none">
            {topKeywords.length === 0 ? (
              <p className="text-body-1 text-gray-500">
                {t("todayRecap.topicsEmpty")}
              </p>
            ) : (
              <ItemGroup className="gap-0">
                {topKeywords.map((keyword, index) => (
                  <Item
                    key={`${keyword}-${index}`}
                    className={cn(
                      "rounded-none border-0 bg-transparent p-0 shadow-none",
                      KEYWORD_STYLES[index % KEYWORD_STYLES.length],
                    )}
                  >
                    #{keyword}
                  </Item>
                ))}
              </ItemGroup>
            )}
          </Item>

          {isEmpty
            ? Array.from({ length: TOPIC_PLACEHOLDER_COUNT }, (_, index) => (
                <TopicCardItem
                  key={index}
                  title="-"
                  content={t("todayRecap.topicsEmpty")}
                  isPlaceholder
                />
              ))
            : topicCards.map((topic, index) => (
                <TopicCardItem
                  key={`${topic.title}-${index}`}
                  title={topic.title}
                  content={topic.content}
                />
              ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default TopVisitedTopics;
