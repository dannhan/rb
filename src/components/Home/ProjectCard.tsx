"use client";

import * as React from "react";
import Link from "next/link";
import { Trash2Icon } from "lucide-react";

import type { WithId, Project } from "@/types";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Props = {
  project: WithId<Project>;
};

const ProjectCard: React.FC<Props> = ({ project }) => {
  return (
    <Card className="group relative h-20 border-none shadow-[0px_1px_2px_.75px_#00000024] transition-colors hover:bg-accent lg:h-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4 pr-12 lg:p-6 lg:pr-12">
        <CardTitle className="text-base font-medium lg:text-lg">
          {project.title}
        </CardTitle>
      </CardHeader>

      {/* TODO: */}
      {/* <Button */}
      {/*   size="icon" */}
      {/*   variant="secondary" */}
      {/*   onClick={() => alert("Hello World!!!")} */}
      {/*   className="absolute right-3 top-3 z-10 h-fit w-fit rounded-full bg-muted p-2 text-muted-foreground opacity-0 transition-all duration-200 hover:bg-muted hover:text-destructive group-hover:opacity-100" */}
      {/* > */}
      {/*   <Trash2Icon className="h-4 w-4" /> */}
      {/* </Button> */}
      <Link
        href={`${project.id}/identitas-proyek`}
        className="absolute inset-0 z-0 rounded-lg"
      />
    </Card>
  );
};

export default ProjectCard;
