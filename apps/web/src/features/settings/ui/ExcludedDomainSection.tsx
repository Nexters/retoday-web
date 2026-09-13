"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { APIError } from "@recap/api";
import {
  type ExcludedDomainFormInput,
  type ExcludedDomainFormOutput,
  excludedDomainFormSchema,
} from "@recap/features/exclude-domain";
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
  useToast,
} from "@recap/ui";

import { useAuth } from "@/entities/auth/ui";
import { USER_KEYS } from "@/features/settings/api/query-keys";
import {
  useDeleteExcludeDomain,
  usePostExcludeDomain,
} from "@/features/settings/api/user-query.client";

type ExcludedDomainSectionProps = {
  disabled?: boolean;
  domains: string[];
};

const ExcludedDomainSection = ({
  disabled = false,
  domains,
}: ExcludedDomainSectionProps) => {
  const { t } = useLocale("settings");
  const { showToast } = useToast();

  const { refreshAuth } = useAuth();
  const queryClient = useQueryClient();

  const { register, handleSubmit, reset, getFieldState, formState } = useForm<
    ExcludedDomainFormInput,
    unknown,
    ExcludedDomainFormOutput
  >({
    resolver: zodResolver(excludedDomainFormSchema),
    defaultValues: { domain: "" },
    mode: "onChange",
  });

  const { isValid } = formState;
  const { isDirty, error: domainFieldError } = getFieldState(
    "domain",
    formState,
  );

  const { mutate: addMutate } = usePostExcludeDomain({
    onSuccess: () => {
      showToast({
        type: "success",
        message: t("untrackedDomains.addSuccess"),
      });
      refreshAuth();
      queryClient.invalidateQueries({
        queryKey: USER_KEYS.details(),
      });
    },
    onError: (error) => {
      if (error instanceof APIError && error.status === 401) return;
      if (
        error instanceof APIError &&
        error.code === "EXCLUDED_DOMAIN_ALREADY_EXISTS"
      ) {
        showToast({
          type: "error",
          message: error.message,
        });
        return;
      }
      if (error instanceof APIError && error.status === 400 && error.message) {
        showToast({
          type: "error",
          message: error.message,
        });
        return;
      }
      showToast({
        type: "error",
        message: t("error.network"),
      });
    },
  });
  const { mutate: deleteMutate } = useDeleteExcludeDomain({
    onSuccess: () => {
      showToast({
        type: "success",
        message: t("untrackedDomains.deleteSuccess"),
      });
      refreshAuth();
      queryClient.invalidateQueries({
        queryKey: USER_KEYS.details(),
      });
    },
    onError: (error) => {
      if (error instanceof APIError && error.status === 401) return;
      if (error instanceof APIError && error.status === 400 && error.message) {
        showToast({
          type: "error",
          message: error.message,
        });
        return;
      }
      showToast({
        type: "error",
        message: t("error.network"),
      });
    },
  });

  const onSubmit = handleSubmit(({ domain }) => {
    addMutate(
      { domain },
      {
        onSuccess: () => {
          reset({ domain: "" });
        },
      },
    );
  });

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
                  onClick={() => deleteMutate({ domain: excludedDomain })}
                >
                  {t("untrackedDomains.delete")}
                </Button>
              </ItemActions>
            </Item>
          ))}
        </ItemGroup>
      )}

      <CardContent className="mt-6 flex min-h-0 min-w-0 flex-1 flex-col p-0 pt-0">
        <form onSubmit={onSubmit} noValidate>
          <Flex
            direction="column"
            gap="none"
            className="w-full gap-3 md:flex-row md:items-start md:gap-4"
          >
            <div className="w-full min-w-0 md:flex-1">
              <Input
                type="text"
                placeholder={t("untrackedDomains.domainInputPlaceholder")}
                aria-invalid={isDirty && domainFieldError ? true : undefined}
                className={cn(
                  "px-3 py-4",
                  isDirty &&
                    domainFieldError &&
                    "border-[#ff4242] focus-visible:ring-[#ff4242]",
                )}
                {...register("domain")}
              />
              {isDirty && domainFieldError?.message ? (
                <p className="text-body-2 mt-1 text-[#ff4242]">
                  {t(`untrackedDomains.validation.${domainFieldError.message}`)}
                </p>
              ) : null}
            </div>

            <div className="w-full shrink-0 md:w-auto md:pt-0">
              <Button
                type="submit"
                variant="default"
                size="md"
                disabled={!isValid}
                className={cn(
                  "px-6 md:w-auto! md:justify-start!",
                  !isValid && "bg-gray-500 hover:bg-gray-600",
                )}
              >
                {t("untrackedDomains.add")}
              </Button>
            </div>
          </Flex>
        </form>
      </CardContent>
    </Card>
  );
};

export default ExcludedDomainSection;
