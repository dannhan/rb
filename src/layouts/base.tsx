import * as React from "react";

import NextTopLoader from "nextjs-toploader";
import { NextAuthProvider } from "@/components/providers/next-auth-provider";
import { FirebaseAuthProvider } from "@/components/providers/firebase-auth-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ToastProvider } from "@/components/providers/toast-provider";
import TailwindIndicator from "@/components/TailwindIndicator";

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
          <ToastProvider />
          <TailwindIndicator />
        </ThemeProvider>
      </FirebaseAuthProvider>
    </NextAuthProvider>
  );
}
