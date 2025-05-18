import * as React from "react";

import NextTopLoader from "nextjs-toploader";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";

import { Toaster } from "@/components/ui/sonner";
import FirebaseAuthProvider from "@/components/Providers/FirebaseAuthProvider";
import TailwindIndicator from "@/components/TailwindIndicator";

const BaseLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <SessionProvider>
      <FirebaseAuthProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextTopLoader color="#a1a1aa" showSpinner={false} />
          {children}
          <Toaster richColors closeButton visibleToasts={3} duration={3000} />
          <TailwindIndicator />
        </ThemeProvider>
      </FirebaseAuthProvider>
    </SessionProvider>
  );
};

export default BaseLayout;
