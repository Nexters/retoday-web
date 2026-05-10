/** @type {import('next').NextConfig} */
import path from "node:path";
import { fileURLToPath } from "node:url";

const appDir = path.dirname(fileURLToPath(import.meta.url));
// Point Turbopack/output tracing at the monorepo root so pnpm-hoisted
// `next` resolves correctly. Pointing at `apps/web` triggers a Next.js 16
// regression where Turbopack infers `apps/web/app` as the project root.
// See https://github.com/vercel/next.js/issues/92540
const monorepoRoot = path.resolve(appDir, "../..");

const nextConfig = {
  transpilePackages: [
    "@recap/ui",
    "@recap/tokens",
    "@recap/i18n",
    "@recap/hooks",
  ],

  outputFileTracingRoot: monorepoRoot,

  turbopack: {
    root: monorepoRoot,
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },

  webpack(config) {
    const assetRule = config.module.rules.find(
      (rule) => rule?.test instanceof RegExp && rule.test.test(".svg"),
    );
    if (assetRule) {
      assetRule.exclude = /\.svg$/i;
    }

    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            icon: true,
          },
        },
      ],
    });

    return config;
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
    deviceSizes: [320, 640, 750, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128],
    minimumCacheTTL: 60,
  },
};

export default nextConfig;
