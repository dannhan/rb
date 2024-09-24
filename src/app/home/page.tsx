import { Open_Sans } from "next/font/google";
import Link from "next/link";

import { auth } from "@/auth";
import { getProjectsByTypeFirebase } from "@/firebase/firestore/project";

import { MapPinIcon } from "lucide-react";
import { Header } from "@/layouts/header";
import { Separator } from "@/components/ui/separator";
import { ModeToggle } from "@/components/mode-toggle";
import { ProjectListCommandDialog } from "@/components/project-list-command-dialog";
import { ProjectCardsList } from "@/components/project-cards-list";
import { Logo } from "@/components/logo";

const open_sans = Open_Sans({ subsets: ["latin"], weight: ["300"] });

export default async function Page() {
  const [konstruksiProjects, renovasiProjects, session] = await Promise.all([
    getProjectsByTypeFirebase("konstruksi"),
    getProjectsByTypeFirebase("renovasi"),
    auth(),
  ]);

  const isAdmin = session?.user.isAdmin;

  return (
    <div className="flex min-h-screen w-full flex-col">
      {/* todo: <div className="absolute top-0 -z-10 h-screen w-screen bg-background bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,theme(colors.accent.DEFAULT),theme(colors.background))]"></div> */}
      <Header className="border-none bg-background text-muted-foreground shadow-md">
        <Logo />
        <div className="flex items-center gap-2">
          {!isAdmin && (
            <Link
              href="/locations"
              className="mr-1 flex gap-1 text-base text-foreground transition-all hover:text-foreground/70 dark:hover:text-foreground/40 sm:mr-4"
            >
              <MapPinIcon className="h-[20px] text-primary" />
              <span
                className="hidden tracking-widest sm:inline"
                style={open_sans.style}
              >
                Find A Store
              </span>
            </Link>
          )}
          <ProjectListCommandDialog
            konstruksiProjects={konstruksiProjects || []}
            renovasiProjects={renovasiProjects || []}
          />
          <ModeToggle />
        </div>
      </Header>
      <main className="flex flex-col items-center gap-4 p-4 md:flex-1 lg:p-6 lg:pb-10">
        <ProjectCardsList
          projects={konstruksiProjects}
          type="konstruksi"
          isAdmin={isAdmin}
        />
        <Separator className="my-2 w-full max-w-screen-lg 2xl:max-w-screen-xl" />
        <ProjectCardsList
          projects={renovasiProjects}
          type="renovasi"
          isAdmin={isAdmin}
        />
      </main>
    </div>
  );
}
