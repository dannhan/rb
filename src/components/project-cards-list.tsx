import { Project } from "@/types";

import { ChevronsRight } from "lucide-react";
import { Button } from "./ui/button";
import { CreateProjectSheet } from "./create-project-sheet";
import { ProjectCard } from "./project-card";

type Props = {
  projects: Project[];
  type: string;
};

export async function ProjectCardsList({ projects, type }: Props) {
  const displayedProjects = projects.slice(0, 3);

  return (
    <section className="flex w-full max-w-screen-lg 2xl:max-w-screen-xl flex-1 flex-col gap-4 md:max-h-56 lg:max-h-64 xl:max-h-72">
      <h2 className="text-lg font-medium capitalize">{type}</h2>
      <div className="grid flex-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <CreateProjectSheet defaultType={type} />
        {displayedProjects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
      <Button className="flex items-center bg-background" size="sm" variant="outline" disabled>
        <span className="mr-1">See More</span>
        <ChevronsRight className="h-5 w-5" />
      </Button>
    </section>
  );
}
