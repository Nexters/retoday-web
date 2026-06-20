"use client";

import { useState } from "react";
import { useLocale } from "@recap/i18n";
import {
  Alert,
  AlertDescription,
  Button,
  Checkbox,
  DialogFooter,
  useStepper,
} from "@recap/ui";

import ErrorIcon from "@/shared/assets/icons/error.svg";

type ConfirmStepProps = {
  onSubmit: () => Promise<void> | void;
  onCancel: () => void;
};

const ConfirmStep = ({ onSubmit, onCancel }: ConfirmStepProps) => {
  const { t } = useLocale("settings");
  const { next } = useStepper();
  const [agreed, setAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleContinue = async () => {
    if (!agreed || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await onSubmit();
      next();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col p-5">
      <div className="flex flex-col gap-6 pb-3">
        <Alert>
          <AlertDescription>
            <ErrorIcon />
            {t("deleteAccount.confirmAlert1")}
          </AlertDescription>
          <AlertDescription>
            <ErrorIcon />
            {t("deleteAccount.confirmAlert2")}
          </AlertDescription>
        </Alert>
        <label className="flex items-center gap-1">
          <Checkbox
            checked={agreed}
            onCheckedChange={(checked) => setAgreed(checked === true)}
          />
          <span className="text-body-2 text-gray-800">
            {t("deleteAccount.confirmAgreement")}
          </span>
        </label>
      </div>

      <DialogFooter className="flex items-center gap-2">
        <Button
          className="flex-1"
          variant="secondary"
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          {t("deleteAccount.cancel")}
        </Button>
        <Button
          className="flex-2"
          type="button"
          disabled={!agreed || isSubmitting}
          onClick={handleContinue}
        >
          {agreed ? t("deleteAccount.continue") : t("deleteAccount.submit")}
        </Button>
      </DialogFooter>
    </div>
  );
};

export default ConfirmStep;
