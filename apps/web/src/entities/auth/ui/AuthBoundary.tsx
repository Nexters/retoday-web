"use client";

import type { PropsWithChildren, ReactNode } from "react";

import { AuthConsumer } from "@/entities/auth/ui";

const AuthBoundary = ({
  children,
  fallback,
  loading,
}: PropsWithChildren<{ fallback: ReactNode; loading: ReactNode }>) => {
  return (
    <AuthConsumer>
      {({ isReady, isLoggedIn }) => {
        if (!isReady) return loading;
        if (!isLoggedIn) return fallback;

        return children;
      }}
    </AuthConsumer>
  );
};

export default AuthBoundary;
