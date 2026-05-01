import type { DEFAULT_NAMESPACE, Resources } from "./constants";

import "react-i18next";

declare module "react-i18next" {
  interface CustomTypeOptions {
    defaultNS: typeof DEFAULT_NAMESPACE;
    resources: Resources;
    returnNull: false;
  }
}
