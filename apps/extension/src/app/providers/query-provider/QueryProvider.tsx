import type { PropsWithChildren } from "react";
import { getHttpStatus, ReactQueryProvider } from "@recap/react-query";

import { useAuthStore } from "@/app/store/model/auth.store";

const QueryProvider = ({ children }: PropsWithChildren) => {
  return (
    <ReactQueryProvider
      options={{
        onError: (error) => {
          if (getHttpStatus(error) === 401) {
            useAuthStore.getState().setIsLoggedIn(false);
          }
        },
      }}
    >
      {children}
    </ReactQueryProvider>
  );
};

export default QueryProvider;
