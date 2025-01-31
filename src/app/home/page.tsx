import { Open_Sans } from "next/font/google";
import Link from "next/link";

import { MapPinIcon } from "lucide-react";
import { auth } from "@/auth";

import { projectSchema } from "@/config/schema";
import { fetchCollection } from "@/lib/firebase/firestore";

import { Header } from "@/layouts/header";
import { Separator } from "@/components/ui/separator";
import { ModeToggle } from "@/components/mode-toggle";
import { ProjectListCommandDialog } from "@/components/project-list-command-dialog";
import { ProjectCardsList } from "@/components/project-cards-list";
import { Logo } from "@/components/logo";
import { HomeLogoutForm } from "@/components/logout-form";

const open_sans = Open_Sans({ subsets: ["latin"], weight: ["300"] });

async function fetchProject(type: "konstruksi" | "renovasi") {
  // TODO:
  // - use different firebase project on test and on deployment
  // - Order by createdAt
  const data = await fetchCollection({
    collectionName: "projects",
    zodSchema: projectSchema,
    errorMessage: "Error fetching data.",
    queryBuilder: (collection) =>
      collection
        // only fetch data that have test field on dev mode
        .where("isTest", "==", process.env.NODE_ENV === "development")
        .where("type", "==", type)
        .select("title", "type", "slug", "createdAt", "isTest"),
  });

  return data.map((datum) => ({
    ...datum,
    createdAt: new Date(datum.createdAt?.seconds * 1000).toLocaleDateString(
      "en-US",
      {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      },
    ),
  }));
}

export default async function Page() {
  const session = await auth();
  const admin = session?.user.isAdmin;

  const [konstruksiProjects, renovasiProjects] = await Promise.all([
    fetchProject("konstruksi"),
    fetchProject("renovasi"),
  ]);

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header className="border-none bg-background text-muted-foreground shadow-md">
        <Logo />
        <div className="flex items-center gap-2">
          {/* TODO: is this still relevant?? */}
          {false && !admin && (
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
          <HomeLogoutForm />
        </div>
      </Header>
      <main className="flex flex-col items-center gap-4 p-4 md:flex-1 lg:p-6 lg:pb-10">
        <ProjectCardsList
          projects={konstruksiProjects}
          type="konstruksi"
          admin={admin}
        />
        <Separator className="my-2 w-full max-w-screen-lg xl:max-w-screen-xl" />
        <ProjectCardsList
          projects={renovasiProjects}
          type="renovasi"
          admin={admin}
        />
      </main>
    </div>
  );
}
