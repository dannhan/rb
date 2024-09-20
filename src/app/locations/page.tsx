import Link from "next/link";
import { notFound } from "next/navigation";

import { auth } from "@/auth";
import { getStoreLocations } from "@/firebase/firestore/store-location";

import { Header } from "@/layouts/header";
import { ModeToggle } from "@/components/mode-toggle";
import { StoreLocator } from "@/components/store-locator";

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
        <Link href="/home">
          <h1 className="text-lg font-semibold md:text-xl">Ria Busana</h1>
        </Link>
        <div className="flex items-center gap-2">
          <ModeToggle />
        </div>
      </Header>
      <main className="flex flex-col items-center gap-4 p-4 md:flex-1 lg:p-6 lg:pb-10">
        <StoreLocator locations={storeLocations} />
      </main>
    </div>
  );
}
