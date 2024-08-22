import { getProjects } from "@/lib/mocks";

import { Separator } from "@/components/ui/separator";
import { Header } from "@/components/blocks/header";
import { ModeToggle } from "@/components/blocks/mode-toggle";
import { ProjectCard } from "@/components/project-card";

export default async function Page() {
  const projects = await getProjects();

  // todo: optimize this
  const konstruksiProjects = projects.filter(
    (project) => project.type === "konstruksi",
  );
  const renovasiProjects = projects.filter(
    (project) => project.type === "renovasi",
  );

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header>
        {/* todo: populate this, create sign-out button or something */}
        <div className="flex items-center w-full max-w-screen-xl">
          <h1 className="w-full text-lg font-semibold md:text-xl">Ria Busana</h1>
          <ModeToggle />
        </div>
      </Header>
      <main className="flex flex-1 flex-col items-center gap-4 p-4 lg:p-6">
        <h2 className="w-full max-w-screen-xl text-xl font-semibold">
          Konstruksi
        </h2>
        <div className="grid w-full max-w-screen-xl gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          {konstruksiProjects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>

        <Separator className="my-4 w-full max-w-screen-xl" />

        <h2 className="w-full max-w-screen-xl text-xl font-semibold">
          Renovasi
        </h2>
        <div className="grid w-full max-w-screen-xl gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          {renovasiProjects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      </main>
    </div>
  );
}
