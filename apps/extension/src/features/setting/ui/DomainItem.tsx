import { APIError } from "@recap/api";
import { useLocale } from "@recap/i18n";
import { useQueryClient } from "@recap/react-query";
import { Button, useToast } from "@recap/ui";

import { USER_KEYS } from "@/features/setting/api/query-keys";
import { useDeleteExcludeDomain } from "@/features/setting/api/user-query";
import { excludedDomainStore } from "@/shared/lib/domain-store";

const DomainItem = ({ domain }: { domain: string }) => {
  const { t } = useLocale("settings");
  const { showToast } = useToast();
  const queryClient = useQueryClient();

  const { mutate } = useDeleteExcludeDomain({
    onSuccess: () => {
      showToast({
        type: "success",
        message: t("untrackedDomains.deleteSuccess"),
      });
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

  const handleDeleteDomain = () => {
    mutate(
      { domain },
      {
        onSuccess: () => {
          excludedDomainStore.remove(domain);
        },
      },
    );
  };

  return (
    <div className="flex items-center justify-between bg-gray-75 rounded-full pr-2 pl-4 py-2">
      <p className="text-body-3 text-gray-500">{domain}</p>
      <div />
      <Button
        variant="subtle"
        size={"sm"}
        className="w-auto text-red-500 px-2.5"
        onClick={handleDeleteDomain}
      >
        {t("untrackedDomains.delete")}
      </Button>
    </div>
  );
};

export default DomainItem;
