"use client";

import { cn } from "@recap/ui";

import RightIcon from "@/assets/icons/arrow-right.svg";
import { useGoogleTokenLogin } from "@/hooks/useGoogleTokenLogin";

const LoginButton = ({
  onLoginSuccess,
  className,
  children,
}: {
  onLoginSuccess?: () => void | Promise<void>;
  className?: string;
  children?: React.ReactNode;
}) => {
  const { ready, login } = useGoogleTokenLogin({ onLoginSuccess });

  return (
    <button
      onClick={login}
      disabled={!ready}
      className={cn(
        "flex items-center gap-2 rounded-xl border border-solid border-gray-300 bg-white px-4 py-2 text-gray-800",
        !ready && "cursor-not-allowed opacity-60",
        className,
      )}
    >
      {children ?? "로그인"}
      <RightIcon />
    </button>
  );
};

export default LoginButton;
