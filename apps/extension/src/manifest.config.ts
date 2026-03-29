import type { ManifestV3Export } from "@crxjs/vite-plugin";

export function createManifest(env: Record<string, string>): ManifestV3Export {
  const version = env.EXTENSION_VERSION || "1.0.0";

  return {
    manifest_version: 3,
    name: "Retoday",
    version,
    description: "Retoday Extension",
    ...(env.VITE_EXTENSION_KEY && { key: env.VITE_EXTENSION_KEY }),
    permissions: ["tabs", "storage", "sidePanel", "identity"],
    action: {
      default_icon: {
        "128": "src/assets/icons/favicon-128.png",
      },
    },
    oauth2: {
      client_id: env.VITE_GOOGLE_CLIENT_ID || "",
      scopes: ["profile", "email"],
    },
    host_permissions: [
      "https://www.googleapis.com/*",
      "https://www.google-analytics.com/*",
    ],
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
