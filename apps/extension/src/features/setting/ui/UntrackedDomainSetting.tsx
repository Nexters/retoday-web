import { useState } from "react";
import { useQueryClient } from "@recap/react-query";
import { Button, Input } from "@recap/ui";

import { USER_KEYS } from "@/features/setting/api/query-key.const";
import {
  useGetUserProfile,
  usePostExcludeDomain,
} from "@/features/setting/api/user-query";
import DomainItem from "@/features/setting/ui/DomainItem";
import { domainStore } from "@/shared/lib/domain-store";

const UntrackedDomainSetting = () => {
  const { data: userProfile } = useGetUserProfile();
  const queryClient = useQueryClient();
  const [doaminValue, setDoaminValue] = useState<string>("");
  const { mutate } = usePostExcludeDomain({
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: USER_KEYS.detail(["user-profile"]),
      });
    },
  });

  const handleAddDomain = () => {
    mutate(
      { domain: doaminValue.trim() },
      {
        onSuccess: () => {
          domainStore.addExcludedDomain(doaminValue.trim());
          setDoaminValue("");
        },
      },
    );
  };

  return (
    <div className="pt-8 pb-6 px-5">
      <h2 className="text-headline-sb text-gray-900">추적금지 도메인</h2>
      <p className="text-subtitle-2-rg text-gray-800 mt-1">
        브라우저 기록 집계에서 제외할 도메인을 관리합니다.
      </p>

      <div className="mt-4 flex flex-col gap-1">
        {userProfile?.excludedDomains.map((domain) => (
          <DomainItem key={domain} domain={domain} />
        ))}
      </div>
      <Input
        className="mt-4"
        value={doaminValue}
        onChange={(e) => setDoaminValue(e.target.value)}
        placeholder="도메인 입력 ( 예 : abc.com sample.kr)"
      />
      <Button
        disabled={!doaminValue.trim().length}
        className="mt-2"
        variant="secondary"
        onClick={handleAddDomain}
      >
        추가하기
      </Button>
    </div>
  );
};

export default UntrackedDomainSetting;
