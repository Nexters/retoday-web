import { useContext } from "react";

import { AuthContext, type AuthValue } from "./auth-context";

export type UseAuthReturn = AuthValue & {
  logout: () => void;
};

export const useAuth = (): UseAuthReturn => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");

  return ctx;
};
