import type { PropsWithChildren } from "react";
import { APIError } from "@recap/api";
import { ReactQueryProvider } from "@recap/react-query";

import { useAuth } from "@/entities/auth/ui";

const QueryProvider = ({ children }: PropsWithChildren) => {
  const { unLogin } = useAuth();

  return (
    <ReactQueryProvider
      options={{
        retry: 0,
        onError: (error: unknown) => {
          if (!(error instanceof APIError)) return;

          if (error.code === "REFRESH_TOKEN_NOT_FOUND") {
            unLogin();
          }
        },
      }}
    >
      {children}
    </ReactQueryProvider>
  );
};

export default QueryProvider;
