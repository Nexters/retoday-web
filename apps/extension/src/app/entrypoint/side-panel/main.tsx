import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { QueryProvider } from "@/app/providers/query-provider";

import { SidePanel } from "./SidePanel";

import "../../styles/globals.css";

const container = document.getElementById("root");
if (container) {
  createRoot(container).render(
    <StrictMode>
      <QueryProvider>
        <SidePanel />
      </QueryProvider>
    </StrictMode>,
  );
}
