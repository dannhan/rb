"use client";

import * as React from "react";

import type { WithId, Project } from "@/types";

import { ChevronsRight, X } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import ProjectCard from "./ProjectCard";

type Props = {
  admin: boolean;
  projects: WithId<Project>[];
  type: string;
};

const ProjectsViewMore: React.FC<Props> = ({ admin, projects, type }) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  return (
    <Sheet open={isModalOpen} onOpenChange={setIsModalOpen}>
      <SheetTrigger asChild>
        <Button
          className="flex items-center bg-background"
          size="sm"
          variant="outline"
          disabled={projects.length <= 3}
        >
          <span className="mr-1">See More</span>
          <ChevronsRight className="h-4 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent
        hideCloseButton
        className="max-h-screen min-h-screen overflow-y-auto border-none pt-12 focus-visible:outline-none focus-visible:ring-0 data-[state=closed]:duration-200 data-[state=open]:duration-300 md:p-12 lg:p-20"
        side="bottom"
      >
        <SheetHeader className="pb-8">
          <SheetTitle className="flex flex-row-reverse items-center gap-4 text-2xl font-normal sm:flex-row">
            <SheetClose>
              <X className="h-6 w-6 text-muted-foreground" />
              <span className="sr-only">Close</span>
            </SheetClose>
            <span className="mr-auto capitalize">{type}</span>
          </SheetTitle>
        </SheetHeader>
        <div className="grid flex-1 gap-2 px-10 md:grid-cols-1 md:gap-4 lg:grid-cols-4">
          {projects.map((project, index) => (
            <ProjectCard key={index} admin={admin} project={project} />
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ProjectsViewMore;
