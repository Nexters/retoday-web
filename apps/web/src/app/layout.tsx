import { Suspense } from "react";
import type { Metadata } from "next";
import localFont from "next/font/local";

import ReactQueryProvider from "@/app/_providers/react-query-provider";
import GNB from "@/shared/ui/GNB";

import "./globals.css";

const ibmPlexSansKR = localFont({
  src: [
    {
      path: "../shared/assets/fonts/IBMPlexSansKR-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../shared/assets/fonts/IBMPlexSansKR-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../shared/assets/fonts/IBMPlexSansKR-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../shared/assets/fonts/IBMPlexSansKR-Bold.woff2",
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
          <div className="mx-4 mt-8 mb-12 flex flex-col gap-5 md:mx-8 md:mt-12 md:mb-20 md:gap-6 xl:mx-17.5 xl:mt-20 xl:mb-35 xl:gap-7">
            <Suspense>
              <GNB />
            </Suspense>
            {children}
          </div>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
