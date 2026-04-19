/** @type {import('next').NextConfig} */
import path from "node:path";
import { fileURLToPath } from "node:url";

// Pin Turbopack/project resolution to this package. If Next infers a parent folder
// (e.g. a stray package-lock.json under the user profile), you get panics like
// "app_dir must be a directory" / Failed to write app endpoint /page.
const appDir = path.dirname(fileURLToPath(import.meta.url));

const nextConfig = {
  transpilePackages: ["@recap/ui", "@recap/tokens"],

  turbopack: {
    root: appDir,
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
    domains: ["lh3.googleusercontent.com"],
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
