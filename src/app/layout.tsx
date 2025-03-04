import * as React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

import { BaseLayout } from "@/layouts/base";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ria Busana",
  description: "Ria Busana internal dashboard.",
};

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      {process.env.NODE_ENV === "development" && (
        <head>
          <script
            crossOrigin="anonymous"
            src="//unpkg.com/react-scan/dist/auto.global.js"
          />
        </head>
      )}
      <body className={inter.className} suppressHydrationWarning>
        <BaseLayout>{children}</BaseLayout>
      </body>
    </html>
  );
}
