import Link from "next/link";
import { notFound } from "next/navigation";

import { auth } from "@/auth";
import { getStoreLocations } from "@/firebase/firestore/store-location";

import { ChevronLeft } from "lucide-react";
import { Header } from "@/layouts/header";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { StoreLocator } from "@/components/store-locator";
import { Logo } from "@/components/logo";

export default async function Page() {
  const [storeLocations, session] = await Promise.all([
    getStoreLocations(),
    auth(),
  ]);
  const isAdmin = session?.user.isAdmin;

  // todo
  if (isAdmin) {
    return notFound();
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header className="border-none bg-background text-muted-foreground shadow-md">
        <Logo />
        <div className="flex items-center gap-2">
          <ModeToggle />
        </div>
      </Header>
      <main className="flex flex-col items-center gap-4 p-4 md:flex-1 lg:p-6 lg:pb-10">
        <Button
          size="sm"
          variant="outline"
          className="mr-auto items-center font-normal"
          asChild
        >
          <Link href={"/home"}>
            <ChevronLeft className="mr-1 h-3.5 w-3.5 -translate-x-1" />
            <span>Kembali</span>
          </Link>
        </Button>
        <StoreLocator locations={storeLocations} />
      </main>
    </div>
  );
}
