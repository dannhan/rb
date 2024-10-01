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
    <html lang="en">
      <body className={inter.className}>
        <BaseLayout>{children}</BaseLayout>
      </body>
    </html>
  );
}
