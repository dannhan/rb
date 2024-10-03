import * as React from "react";

import NextTopLoader from "nextjs-toploader";
import { Toaster } from "@/components/ui/sonner";
import { NextAuthProvider } from "@/components/providers/next-auth-provider";
import { FirebaseAuthProvider } from "@/components/providers/firebase-auth-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { TailwindIndicator } from "@/components/tailwind-indicator";

type Props = React.PropsWithChildren;

export function BaseLayout({ children }: Props) {
  return (
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
          <Toaster expand richColors closeButton visibleToasts={6} />
          <TailwindIndicator />
        </ThemeProvider>
      </FirebaseAuthProvider>
    </NextAuthProvider>
  );
}
