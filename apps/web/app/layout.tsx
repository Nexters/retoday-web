import { Suspense } from "react";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { DEFAULT_LANGUAGE } from "@recap/i18n";

import { LanguageProvider, ReactQueryProvider } from "@/app/providers";
import { AnalyticsProvider, AnalyticsScripts } from "@/app/providers/analytics";
import { AuthProvider } from "@/entities/auth/ui";
import { MainHeader, MainLayout } from "@/widgets/layout/ui";

import "../src/app/styles/globals.css";

const ibmPlexSansKR = localFont({
  src: [
    {
      path: "../src/shared/assets/fonts/IBMPlexSansKR-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../src/shared/assets/fonts/IBMPlexSansKR-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../src/shared/assets/fonts/IBMPlexSansKR-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../src/shared/assets/fonts/IBMPlexSansKR-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "re-today",
  description: "re-today",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang={DEFAULT_LANGUAGE}
      className={`${ibmPlexSansKR.variable} flex min-h-screen justify-center bg-gray-100`}
      suppressHydrationWarning
    >
      <body className="min-h-screen w-[min(100%,80rem)] bg-gray-100">
        <ReactQueryProvider>
          <LanguageProvider>
            <AnalyticsProvider>
              <AuthProvider>
                <MainLayout>
                  <Suspense>
                    <MainHeader />
                  </Suspense>
                  {children}
                </MainLayout>
              </AuthProvider>
            </AnalyticsProvider>
          </LanguageProvider>
        </ReactQueryProvider>
        <AnalyticsScripts />
      </body>
    </html>
  );
}
