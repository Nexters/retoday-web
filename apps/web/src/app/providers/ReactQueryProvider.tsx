"use client";

import React from "react";
import { APIError } from "@recap/api";
import { ReactQueryProvider as ReactQueryProviderComponent } from "@recap/react-query";

import { useAuth } from "@/entities/auth/ui";

export default function ReactQueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { unLogin } = useAuth();

  return (
    <ReactQueryProviderComponent
      options={{
        retry: 0,
        onError: (error: unknown) => {
          if (!(error instanceof APIError)) return;

          if (error.code === "REFRESH_TOKEN_NOT_FOUND") {
            void unLogin();
          }
        },
      }}
    >
      {children}
    </ReactQueryProviderComponent>
  );
}
