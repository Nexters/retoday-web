"use client";

import { useCallback, useState } from "react";
import { useLocale } from "@recap/i18n";
import { useDisclosure } from "@recap/lib";
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Stepper,
} from "@recap/ui";

import {
  INITIAL_DELETE_ACCOUNT_FORM,
  STEP_TITLE_KEYS,
} from "@/features/settings/config/account-reason";
import type { DeleteAccountForm } from "@/features/settings/model/account.type";
import ConfirmStep from "@/features/settings/ui/delete-account/ConfirmStep";
import DoneStep from "@/features/settings/ui/delete-account/DoneStep";
import ReasonStep from "@/features/settings/ui/delete-account/ReasonStep";
import RightIcon from "@/shared/assets/icons/arrow-right-gray.svg";

const DeleteAccountButton = () => {
  const { t } = useLocale("settings");
  const [isOpen, { close, set }] = useDisclosure(false);
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<DeleteAccountForm>({
    ...INITIAL_DELETE_ACCOUNT_FORM,
  });

  const resetState = useCallback(() => {
    setStep(0);
    setForm({ ...INITIAL_DELETE_ACCOUNT_FORM });
  }, []);

  const handleOpenChange = (open: boolean) => {
    set(open);
    if (!open) {
      resetState();
    }
  };

  const handleClose = () => {
    close();
    resetState();
  };

  const handleSubmit = async () => {
    // TODO: 회원 탈퇴 API 연동
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          variant={"subtle"}
          className="text-subtitle-1-md mt-7 flex items-center justify-start gap-1 p-2 text-gray-500"
        >
          {t("account.deleteAccount")}
          <RightIcon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="border-b border-solid border-gray-200">
          <DialogTitle>
            {t(`deleteAccount.stepTitle.${STEP_TITLE_KEYS[step]}`)}
          </DialogTitle>
          {step !== 2 && <DialogClose />}
        </DialogHeader>
        <Stepper currentStep={step} onStepChange={setStep}>
          <ReasonStep value={form} onChange={setForm} onCancel={handleClose} />
          <ConfirmStep onSubmit={handleSubmit} onCancel={handleClose} />
          <DoneStep onClose={handleClose} />
        </Stepper>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteAccountButton;
