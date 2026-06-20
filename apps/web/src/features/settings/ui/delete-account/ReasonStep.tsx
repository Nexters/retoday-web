"use client";

import { useLocale } from "@recap/i18n";
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
  const { t } = useLocale("settings");

  return (
    <div className="flex flex-col p-5">
      <div className="flex flex-col gap-2 pb-6">
        <Select
          value={value.reason}
          onValueChange={(reason) => onChange({ ...value, reason })}
        >
          <SelectTrigger className="text-subtitle-1-md h-14 text-gray-800">
            <SelectValue
              placeholder={t("deleteAccount.reasonSelectPlaceholder")}
            />
          </SelectTrigger>
          <SelectContent>
            {ACCOUNT_REASON_LIST.map((reason) => (
              <SelectItem key={reason} value={reason}>
                {t(`deleteAccount.reasonOptions.${reason}`)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <TextArea
          rows={8}
          placeholder={t("deleteAccount.commentPlaceholder")}
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
          {t("deleteAccount.cancel")}
        </Button>
        <Button
          className="flex-2"
          type="button"
          disabled={!value.reason}
          onClick={next}
        >
          {t("deleteAccount.continue")}
        </Button>
      </DialogFooter>
    </div>
  );
};

export default ReasonStep;
