import { useLocale } from "@recap/i18n";
import { cn } from "@recap/ui";

import { Icon } from "@/shared/ui";

type GoogleLoginButtonProps = {
  className?: string;
  onClick?: () => void;
};
const GoogleLoginButton = ({ className, onClick }: GoogleLoginButtonProps) => {
  const { t } = useLocale("landing");

  return (
    <button
      className={cn(
        "flex cursor-pointer items-center overflow-hidden rounded-xs border border-[#346EF1] bg-white hover:shadow-md transition-shadow",
        className,
      )}
      onClick={onClick}
    >
      <div className="flex items-center justify-center bg-white p-2.5">
        <Icon name="google" className="size-[18px]" />
      </div>
      <div className="bg-[#346EF1] p-2.5">
        <span className="text-sm font-bold text-white">
          {t("auth.signInWithGoogle")}
        </span>
      </div>
    </button>
  );
};

export default GoogleLoginButton;
