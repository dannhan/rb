"use client";

import * as React from "react";
import Link from "next/link";

import type { WithId, Project } from "@/types";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import ProjectCardAction from "./ProjectCardAction";

type Props = { admin: boolean; project: WithId<Project> };
const ProjectCard: React.FC<Props> = ({ admin, project }) => {
  return (
    <Card className="group relative h-20 border-none shadow-[0px_1px_2px_.75px_#00000024] transition-colors hover:bg-accent lg:h-full">
      {/* TODO: create the padding-right only applied for the first-row */}
      <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4 pr-[52px] lg:p-6 lg:pr-[52px]">
        <CardTitle className="text-base font-medium lg:text-lg">
          {project.title}
        </CardTitle>
      </CardHeader>
      {admin && <ProjectCardAction project={project} />}
      <Link
        href={`${project.id}/identitas-proyek`}
        className="absolute inset-0 z-0 rounded-lg"
      />
    </Card>
  );
};

export default ProjectCard;
