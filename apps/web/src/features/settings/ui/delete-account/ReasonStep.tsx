"use client";

import {
  Button,
  DialogFooter,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  TextArea,
  useStepper,
} from "@recap/ui";

import { ACCOUNT_REASON_LIST } from "@/features/settings/config/account-reason";
import type { DeleteAccountForm } from "@/features/settings/model/account.type";

type ReasonStepProps = {
  value: DeleteAccountForm;
  onChange: (value: DeleteAccountForm) => void;
  onCancel: () => void;
};

const ReasonStep = ({ value, onChange, onCancel }: ReasonStepProps) => {
  const { next } = useStepper();

  return (
    <div className="flex flex-col p-5">
      <div className="flex flex-col gap-2 pb-6">
        <Select
          value={value.reason}
          onValueChange={(reason) => onChange({ ...value, reason })}
        >
          <SelectTrigger className="text-subtitle-1-md h-14 text-gray-800">
            <SelectValue placeholder="탈퇴사유를 선택해주세요" />
          </SelectTrigger>
          <SelectContent>
            {ACCOUNT_REASON_LIST.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <TextArea
          rows={8}
          placeholder="불편했던 점이나 의견을 자유롭게 적어주세요.작은 의견 하나도 서비스 개선에 큰 도움이 됩니다! eg) 00 이 불편해요. / 이런 기능이 필요해요."
          value={value.comment}
          onChange={(event) =>
            onChange({ ...value, comment: event.target.value })
          }
        />
      </div>

      <DialogFooter className="flex items-center gap-2">
        <Button
          className="flex-1"
          variant="secondary"
          type="button"
          onClick={onCancel}
        >
          취소하기
        </Button>
        <Button
          className="flex-2"
          type="button"
          disabled={!value.reason}
          onClick={next}
        >
          계속하기
        </Button>
      </DialogFooter>
    </div>
  );
};

export default ReasonStep;
