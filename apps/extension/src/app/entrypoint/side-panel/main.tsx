import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { LanguageProvider } from "@/app/providers/language-provider";
import { QueryProvider } from "@/app/providers/query-provider";
import { AuthProvider } from "@/entities/auth/ui";

import { SidePanel } from "./SidePanel";

import "../../styles/globals.css";

const container = document.getElementById("root");
if (container) {
  createRoot(container).render(
    <StrictMode>
      <LanguageProvider>
        <AuthProvider>
          <QueryProvider>
            <SidePanel />
          </QueryProvider>
        </AuthProvider>
      </LanguageProvider>
    </StrictMode>,
  );
}
