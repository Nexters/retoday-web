import type { PropsWithChildren } from "react";
import { APIError } from "@recap/api";
import { ReactQueryProvider } from "@recap/react-query";

import { useAuth } from "@/entities/auth/ui";

const QueryProvider = ({ children }: PropsWithChildren) => {
  const { logout } = useAuth();

  return (
    <ReactQueryProvider
      options={{
        onError: (error: unknown) => {
          if (!(error instanceof APIError)) return;

          if (error.code === "REFRESH_TOKEN_NOT_FOUND") {
            logout();
          }
        },
      }}
    >
      {children}
    </ReactQueryProvider>
  );
};

export default QueryProvider;
