import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { LanguageProvider } from "@/app/providers/language-provider";
import { QueryProvider } from "@/app/providers/query-provider";

import { SidePanel } from "./SidePanel";

import "../../styles/globals.css";

const container = document.getElementById("root");
if (container) {
  createRoot(container).render(
    <StrictMode>
      <LanguageProvider>
        <QueryProvider>
          <SidePanel />
        </QueryProvider>
      </LanguageProvider>
    </StrictMode>,
  );
}
