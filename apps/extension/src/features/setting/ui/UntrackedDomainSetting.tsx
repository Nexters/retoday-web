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
import { Button, cn, Input, useToast } from "@recap/ui";

import { USER_KEYS } from "@/features/setting/api/query-keys";
import { usePostExcludeDomain } from "@/features/setting/api/user-query";
import DomainItem from "@/features/setting/ui/DomainItem";
import { excludedDomainStore } from "@/shared/lib/domain-store";

type UntrackedDomainSettingProps = {
  domains: string[];
};

const UntrackedDomainSetting = ({ domains }: UntrackedDomainSettingProps) => {
  const { t } = useLocale("settings");
  const { showToast } = useToast();
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

  const onSubmit = handleSubmit(({ domain }) => {
    addMutate(
      { domain },
      {
        onSuccess: () => {
          excludedDomainStore.add(domain);
          reset({ domain: "" });
        },
      },
    );
  });

  return (
    <div className="px-5 pt-8 pb-6">
      <h2 className="text-headline-sb text-gray-900">
        {t("untrackedDomains.title")}
      </h2>
      <p className="text-subtitle-2-rg mt-1 text-gray-800">
        {t("untrackedDomains.description")}
      </p>

      <div className="mt-4 flex flex-col gap-1">
        {domains.map((domain) => (
          <DomainItem key={domain} domain={domain} />
        ))}
      </div>

      <form onSubmit={onSubmit} noValidate>
        <Input
          type="text"
          className={cn(
            "mt-4",
            isDirty &&
              domainFieldError &&
              "border-[#ff4242] focus-visible:ring-[#ff4242]",
          )}
          placeholder={t("untrackedDomains.domainInputPlaceholder")}
          aria-invalid={isDirty && domainFieldError ? true : undefined}
          {...register("domain")}
        />
        {isDirty && domainFieldError?.message ? (
          <p className="text-body-3 mt-1 text-[#ff4242]">
            {t(`untrackedDomains.validation.${domainFieldError.message}`)}
          </p>
        ) : null}
        <Button
          type="submit"
          disabled={!isValid}
          className={cn("mt-2", !isValid && "opacity-50")}
          variant="secondary"
        >
          {t("untrackedDomains.add")}
        </Button>
      </form>
    </div>
  );
};

export default UntrackedDomainSetting;
