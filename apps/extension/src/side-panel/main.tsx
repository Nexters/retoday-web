import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ReactQueryProvider } from "@recap/react-query";

import { SidePanel } from "./SidePanel";

import "../styles/globals.css";

const container = document.getElementById("root");
if (container) {
  createRoot(container).render(
    <StrictMode>
      <ReactQueryProvider>
        <SidePanel />
      </ReactQueryProvider>
    </StrictMode>,
  );
}
