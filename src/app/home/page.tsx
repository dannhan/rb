import { getProjectsByTypeFirebase } from "@/firebase/firestore/project";

import { Separator } from "@/components/ui/separator";
import { Header } from "@/components/blocks/header";
import { ModeToggle } from "@/components/blocks/mode-toggle";
import { ProjectListCommandDialog } from "@/components/project-list-command-dialog";
import { ProjectCardsList } from "@/components/project-cards-list";

export default async function Page() {
  const [konstruksiProjects, renovasiProjects] = await Promise.all([
    getProjectsByTypeFirebase("konstruksi"),
    getProjectsByTypeFirebase("renovasi"),
  ]);

  return (
    <div className="flex min-h-screen w-full flex-col">
      {/* todo: <div className="absolute top-0 -z-10 h-screen w-screen bg-background bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,theme(colors.accent.DEFAULT),theme(colors.background))]"></div> */}
      <Header className="border-none bg-background text-muted-foreground shadow-md">
        <h1 className="text-lg font-semibold md:text-xl">Ria Busana</h1>
        <div className="flex items-center gap-2">
          <ProjectListCommandDialog
            konstruksiProjects={konstruksiProjects || []}
            renovasiProjects={renovasiProjects || []}
          />
          <ModeToggle />
        </div>
      </Header>
      <main className="flex flex-col items-center gap-4 p-4 md:flex-1 lg:p-6 lg:pb-10">
        <ProjectCardsList projects={konstruksiProjects} type="konstruksi" />
        <Separator className="my-2 w-full max-w-screen-lg 2xl:max-w-screen-xl" />
        <ProjectCardsList projects={renovasiProjects} type="renovasi" />
      </main>
    </div>
  );
}
