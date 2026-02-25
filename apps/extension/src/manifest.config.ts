import type { ManifestV3Export } from "@crxjs/vite-plugin";

export function createManifest(env: Record<string, string>): ManifestV3Export {
  return {
    manifest_version: 3,
    name: "Retoday",
    version: "1.0.0",
    description: "Retoday Extension",
    permissions: [
      "tabs",
      "storage",
      "activeTab",
      "sidePanel",
      "identity",
      "identity.email",
    ],
    action: {
      default_icon: {
        "128": "src/assets/icons/favicon-128.png",
      },
    },
    oauth2: {
      client_id: env.VITE_GOOGLE_CLIENT_ID || "",
      scopes: ["profile", "email"],
    },
    host_permissions: ["https://www.googleapis.com/*"],
    side_panel: {
      default_path: "src/side-panel/index.html",
    },
    background: {
      service_worker: "src/background/index.ts",
      type: "module",
    },
    content_scripts: [
      {
        matches: ["<all_urls>"],
        js: ["src/content/index.ts"],
        run_at: "document_end",
      },
    ],
    icons: {
      "128": "src/assets/icons/favicon-128.png",
    },
  };
}
