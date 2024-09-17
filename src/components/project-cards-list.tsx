import { Project } from "@/types";

import { CreateProjectSheet } from "./create-project-sheet";
import { ProjectCard } from "./project-card";
import { ProjectSeeMoreSheet } from "./project-see-more-sheet";

type Props = {
  projects: Project[];
  type: string;
};

export async function ProjectCardsList({ projects, type }: Props) {
  const displayedProjects = projects.slice(0, 3);

  return (
    <section className="flex w-full max-w-screen-lg flex-1 flex-col gap-4 md:flex-initial lg:max-h-64 lg:flex-1 xl:max-h-72 2xl:max-w-screen-xl">
      <h2 className="text-lg font-medium capitalize">{type}</h2>
      <div className="grid flex-1 gap-2 md:grid-cols-2 md:gap-4 lg:grid-cols-4">
        <CreateProjectSheet defaultType={type} />
        {displayedProjects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
      <ProjectSeeMoreSheet projects={projects} type={type} />
    </section>
  );
}
