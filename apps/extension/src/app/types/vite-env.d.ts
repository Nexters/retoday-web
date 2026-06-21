/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BACKEND_URL: string;
  readonly VITE_GOOGLE_CLIENT_ID: string;
  readonly VITE_EXTENSION_KEY: string;
  readonly VITE_GA_MEASUREMENT_ID: string;
  readonly VITE_GA_API_SECRET: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module "*.svg" {
  const content: string;
  export default content;
}

declare module "*.svg?react" {
  import type { FC, SVGProps } from "react";

  const content: FC<SVGProps<SVGSVGElement>>;

  export default content;
}
