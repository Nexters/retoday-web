import { Suspense } from "react";
import type { Metadata } from "next";
import localFont from "next/font/local";

import { ReactQueryProvider } from "@/app/providers";
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
    <html lang="ko" className={ibmPlexSansKR.variable}>
      <body className="mx-auto max-w-7xl bg-gray-100">
        <ReactQueryProvider>
          <AuthProvider>
            <MainLayout>
              <Suspense>
                <MainHeader />
              </Suspense>
              {children}
            </MainLayout>
          </AuthProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
