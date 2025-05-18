import * as React from "react";
import type { Metadata } from "next";

import { inter, satoshi } from "@/styles/fonts";
import "@/styles/globals.css";

import { cn } from "@/lib/utils/cn";
import { BaseLayout } from "@/layouts/base";

export const metadata: Metadata = {
  title: "Ria Busana",
  description: "Ria Busana internal dashboard.",
};

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(satoshi.className, inter.variable)}
    >
      {process.env.NODE_ENV === "development" && (
        <head>
          <script
            crossOrigin="anonymous"
            src="//unpkg.com/react-scan/dist/auto.global.js"
            defer
          />
        </head>
      )}
      <body suppressHydrationWarning>
        <BaseLayout>{children}</BaseLayout>
      </body>
    </html>
  );
}
