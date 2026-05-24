"use client";

import { useLocale } from "@recap/i18n";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Item,
  ItemActions,
  ItemContent,
  ItemGroup,
  ItemTitle,
} from "@recap/ui";

import { useTopVisitedSiteList } from "@/features/analysis/model/use-top-visited-site-list";
import { formatSecondsToMinutes } from "@/shared/lib/date/format-date";
import { toHttpsUrl } from "@/shared/lib/url";

const TopVisitedSites = ({ date }: { date: string }) => {
  const { t } = useLocale("analysis");
  const { t: tc } = useLocale("common");
  const { data, isLoading } = useTopVisitedSiteList(date);

  const isEmpty = !isLoading && data.length === 0;

  return (
    <Card className="gap-0 rounded-[1.25rem] bg-white p-5 shadow-none md:p-6 xl:p-10">
      <CardHeader className="gap-0 p-0">
        <CardTitle className="text-heading-rg whitespace-nowrap text-gray-800">
          {t("frequentSites.title")}
        </CardTitle>
      </CardHeader>

      <CardContent className="mt-5 p-0 md:mt-6">
        {isEmpty ? (
          <div className="text-body-1 text-gray-500">
            {t("frequentSites.emptyState")}
          </div>
        ) : (
          <ItemGroup className="gap-2">
            {data.map((item, idx) => (
              <Item
                key={`${item.domain}-${idx}`}
                className="bg-gray-75 flex-nowrap items-center justify-between gap-2 rounded-full border-0 p-2 shadow-none"
              >
                <ItemContent className="min-w-0 flex-1 flex-row items-center gap-3">
                  <Avatar aria-hidden className="size-6 shrink-0">
                    {item.faviconUrl && (
                      <AvatarImage
                        src={item?.faviconUrl}
                        alt=""
                        className="object-contain"
                        referrerPolicy="no-referrer"
                      />
                    )}
                    <AvatarFallback />
                  </Avatar>

                  <ItemTitle className="text-body-1 truncate font-normal text-gray-500">
                    {toHttpsUrl(item.domain)}
                  </ItemTitle>
                </ItemContent>

                <ItemActions className="ml-2 shrink-0 gap-0">
                  <span className="text-body-1 whitespace-nowrap text-gray-900">
                    {formatSecondsToMinutes(item.stayDuration ?? 0, tc)}
                  </span>
                </ItemActions>
              </Item>
            ))}
          </ItemGroup>
        )}
      </CardContent>
    </Card>
  );
};

export default TopVisitedSites;
