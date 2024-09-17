import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import NextTopLoader from "nextjs-toploader";
import { ThemeProvider } from "@/components/theme-provider";
import { NextAuthProvider } from "@/components/providers/next-auth-provider";
import { FirebaseAuthProvider } from "@/components/providers/firebase-auth-provider";
import { Toaster } from "@/components/ui/sonner";
import { TailwindIndicator } from "@/components/tailwind-indicator";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ria Busana",
  description: "Ria Busana internal dashboard.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
          <FirebaseAuthProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <NextTopLoader
                color="#a1a1aa"
                showSpinner={false}
                initialPosition={0.3}
                crawlSpeed={200}
              />
              {children}
              <Toaster richColors closeButton />
              <TailwindIndicator />
            </ThemeProvider>
          </FirebaseAuthProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
