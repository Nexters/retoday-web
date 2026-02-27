import { useQueryClient } from "@recap/react-query";
import { Button } from "@recap/ui";

import { USER_KEYS } from "@/entities/user/queries/query-key.const";
import { useDeleteExcludeDomain } from "@/entities/user/queries/user-query";
import { domainStore } from "@/lib/domain-store";

const DomainItem = ({ domain }: { domain: string }) => {
  const queryClient = useQueryClient();

  const { mutate } = useDeleteExcludeDomain({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: USER_KEYS.detail(["user-profile"]),
      });
    },
  });

  const handleDeleteDomain = () => {
    mutate(
      { domain },
      {
        onSuccess: () => {
          domainStore.deleteExcludedDomain(domain);
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
        삭제
      </Button>
    </div>
  );
};

export default DomainItem;
