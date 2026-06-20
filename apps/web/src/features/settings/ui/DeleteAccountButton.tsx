"use client";

import { useState } from "react";
import { useLocale } from "@recap/i18n";
import { useDisclosure } from "@recap/lib";
import { useQueryClient } from "@recap/react-query";
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
  clearSession,
  fetchOAuthToken,
} from "@/entities/auth/api/auth-session-client";
import { useAuth } from "@/entities/auth/ui";
import { USER_KEYS } from "@/features/settings/api/query-keys";
import { useDeleteUserAccount } from "@/features/settings/api/user-query.client";
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
  const { refreshAuth } = useAuth();
  const queryClient = useQueryClient();
  const { mutateAsync: deleteUserAccount } = useDeleteUserAccount();
  const [isOpen, { close, set }] = useDisclosure(false);
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<DeleteAccountForm>({
    ...INITIAL_DELETE_ACCOUNT_FORM,
  });

  const resetState = () => {
    setStep(0);
    setForm({ ...INITIAL_DELETE_ACCOUNT_FORM });
  };

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
    const oAuthToken = await fetchOAuthToken();
    await deleteUserAccount({ oAuthToken });
  };

  const handleConfirm = async () => {
    await clearSession();
    queryClient.removeQueries({
      queryKey: USER_KEYS.details(),
    });
    await refreshAuth();
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
          <DoneStep onConfirm={handleConfirm} onClose={handleClose} />
        </Stepper>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteAccountButton;
