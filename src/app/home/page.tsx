import { getProjects } from "@/lib/mocks";

import { Separator } from "@/components/ui/separator";
import { Header } from "@/components/blocks/header";
import { CreateProjectButton } from "@/components/create-project-button";
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
      <Header className="border-none bg-background">
        <h1 className="w-full text-lg font-semibold md:text-xl">Ria Busana</h1>
      </Header>
      <main className="flex flex-1 flex-col items-center gap-4 px-4 pb-8 pt-4 lg:px-6 lg:pb-12 lg:pt-6">
        <section className="flex max-h-56 w-full max-w-screen-xl flex-1 flex-col gap-4">
          <h2 className="text-xl font-semibold">Konstruksi</h2>
          <div className="grid flex-1 gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
            <CreateProjectButton />
            {konstruksiProjects.map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}
          </div>
        </section>
        <Separator className="my-4 w-full max-w-screen-xl" />
        <section className="flex max-h-56 w-full max-w-screen-xl flex-1 flex-col gap-4">
          <h2 className="text-xl font-semibold">Renovasi</h2>
          <div className="grid flex-1 gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
            <CreateProjectButton />
            {renovasiProjects.map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
