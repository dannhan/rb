import { auth } from "@/auth";
import type { WithId, Project } from "@/types";

import ProjectCard from "./ProjectCard";
import CreateProjectSheet from "./CreateProjectSheet";
import ProjectsViewMore from "./ProjectsViewMore";

type Props = { projects: WithId<Project>[]; type: "renovasi" | "konstruksi" };

const ProjectCardsList: React.FC<Props> = async ({ projects, type }) => {
  const displayedProjects = projects.slice(0, 3);

  const session = await auth();
  const admin = session?.user.isAdmin ?? false;

  return (
    <section className="flex w-full max-w-screen-lg flex-1 flex-col gap-4 md:flex-initial lg:max-h-64 lg:flex-1 xl:max-h-72 xl:max-w-screen-xl">
      <h2 className="text-lg font-medium capitalize">{type}</h2>
      <div className="grid flex-1 gap-2 md:grid-cols-2 md:gap-4 lg:grid-cols-4">
        {admin && <CreateProjectSheet defaultType={type} />}
        {displayedProjects.map((project) => (
          <ProjectCard key={project.id} admin={admin} project={project} />
        ))}
      </div>
      <ProjectsViewMore type={type} admin={admin} projects={projects} />
    </section>
  );
};

export default ProjectCardsList;
