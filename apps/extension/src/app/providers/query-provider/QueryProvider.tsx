import type { PropsWithChildren } from "react";
import { ReactQueryProvider } from "@recap/react-query";

const QueryProvider = ({ children }: PropsWithChildren) => {
  return <ReactQueryProvider>{children}</ReactQueryProvider>;
};

export default QueryProvider;
