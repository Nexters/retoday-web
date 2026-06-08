"use client";

import { useState } from "react";
import { useLocale } from "@recap/i18n";
import { useQueryClient } from "@recap/react-query";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  cn,
  Flex,
  Input,
  Item,
  ItemActions,
  ItemGroup,
} from "@recap/ui";

import { useAuth } from "@/entities/auth/ui";
import { USER_KEYS } from "@/features/settings/api/query-keys";
import {
  useDeleteExcludeDomain,
  usePostExcludeDomain,
} from "@/features/settings/api/user-query";

type ExcludedDomainSectionProps = {
  disabled?: boolean;
  domains: string[];
};

const ExcludedDomainSection = ({
  disabled = false,
  domains,
}: ExcludedDomainSectionProps) => {
  const { t } = useLocale("settings");
  const [domain, setDomain] = useState("");

  const { refreshAuth } = useAuth();
  const queryClient = useQueryClient();

  const { mutate: addMutate } = usePostExcludeDomain({
    onSuccess: () => {
      refreshAuth();
      queryClient.invalidateQueries({
        queryKey: USER_KEYS.details(),
      });
    },
  });
  const { mutate: deleteMutate } = useDeleteExcludeDomain({
    onSuccess: () => {
      refreshAuth();
      queryClient.invalidateQueries({
        queryKey: USER_KEYS.details(),
      });
    },
  });

  const handleAddDomain = (domain: string) => {
    addMutate({ domain });
  };

  const handleDeleteDomain = (domain: string) => {
    deleteMutate({ domain });
  };

  const handleAdd = () => {
    if (!domain) return;
    handleAddDomain(domain);
    setDomain("");
  };

  return (
    <Card
      className={cn(
        "flex w-full flex-col flex-nowrap items-stretch gap-0 px-5 py-5 md:px-6 md:py-6 xl:px-9 xl:py-8",
        disabled && "pointer-events-none opacity-50",
      )}
    >
      <CardHeader className="flex shrink-0 flex-col gap-2 p-0">
        <CardTitle className="text-heading-rg text-gray-800">
          {t("untrackedDomains.title")}
        </CardTitle>

        <CardDescription className="text-body-1 mt-0 text-gray-900">
          {t("untrackedDomains.description")}
        </CardDescription>
      </CardHeader>

      {domains.length > 0 && (
        <ItemGroup role="list" className="mt-6 gap-1">
          {domains.map((excludedDomain) => (
            <Item
              key={excludedDomain}
              role="listitem"
              className="bg-gray-75 flex w-full flex-nowrap items-center justify-between gap-4 rounded-full p-0 px-4 py-2"
            >
              <span className="text-body-1 min-w-0 flex-1 truncate text-gray-500">
                {excludedDomain}
              </span>

              <ItemActions className="shrink-0">
                <Button
                  type="button"
                  variant="subtle"
                  size="sm"
                  className="text-body-1 h-auto rounded-none border-0 bg-transparent p-0 text-[#ff4242] shadow-none hover:bg-transparent hover:text-[#e03333]"
                  onClick={() => handleDeleteDomain(excludedDomain)}
                >
                  {t("untrackedDomains.delete")}
                </Button>
              </ItemActions>
            </Item>
          ))}
        </ItemGroup>
      )}

      <CardContent className="mt-6 flex min-h-0 min-w-0 flex-1 flex-col p-0 pt-0">
        <Flex
          direction="column"
          gap="none"
          className="w-full gap-3 md:flex-row md:items-center md:gap-4"
        >
          <div className="w-full min-w-0 md:flex-1">
            <Input
              type="text"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              placeholder={t("untrackedDomains.domainInputPlaceholder")}
              className="px-3 py-4"
            />
          </div>

          <div className="w-full shrink-0 md:w-auto">
            <Button
              type="button"
              variant="default"
              size="md"
              className={cn(
                "px-6 md:w-auto! md:justify-start!",
                domain.length === 0 && "bg-gray-500 hover:bg-gray-600",
              )}
              onClick={handleAdd}
            >
              {t("untrackedDomains.add")}
            </Button>
          </div>
        </Flex>
      </CardContent>
    </Card>
  );
};

export default ExcludedDomainSection;
