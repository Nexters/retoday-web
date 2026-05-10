"use client";

import { type ReactNode, useContext } from "react";

import { AuthContext, type AuthValue } from "./auth-context";

type AuthConsumerProps = {
  children: (auth: AuthValue) => ReactNode;
};

const AuthConsumer = ({ children }: AuthConsumerProps) => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("<AuthConsumer> must be used within <AuthProvider>");
  }
  return <>{children(ctx)}</>;
};

export default AuthConsumer;
