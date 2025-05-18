"use client";

import * as React from "react";

import { EditIcon, MoreHorizontalIcon, Trash2Icon } from "lucide-react";

import type { WithId, Project } from "@/types";

import { cn } from "@/lib/utils/cn";
import { useDeleteProjectModal } from "@/components/Dialogs/DeleteProjectDialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UpdateProjectForm from "@/components/Forms/UpdateProjectForm";

type Props = {
  project: WithId<Project>;
};

const ProjectCardAction: React.FC<Props> = ({ project }) => {
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const [editDialogOpen, setEditDialogOpen] = React.useState(false);
  const { setShowDeleteProjectModal, DeleteProjectModal } =
    useDeleteProjectModal({ id: project.id });

  return (
    <>
      <DeleteProjectModal />
      <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "absolute right-3 top-5 z-10 h-fit w-fit rounded-full p-2 text-muted-foreground opacity-100 transition-all duration-200 hover:bg-muted focus-visible:border-none focus-visible:ring-0 group-hover:opacity-100 lg:opacity-0",
              dropdownOpen && "lg:opacity-100",
            )}
          >
            <MoreHorizontalIcon className="h-6 w-6" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="z-50 w-40 rounded-xl px-1.5 py-1 shadow-xl"
          align="end"
        >
          <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
            <DialogTrigger asChild>
              <DropdownMenuItem
                onSelect={(event) => {
                  event.preventDefault();
                  setEditDialogOpen(true);
                }}
                className="rounded-md font-medium"
              >
                <EditIcon className="mr-2 h-4 w-4" />
                <span>Ganti Nama</span>
              </DropdownMenuItem>
            </DialogTrigger>
            <DialogContent className="w-full max-w-xl">
              <DialogHeader>
                <DialogTitle>Ganti Nama Proyek</DialogTitle>
              </DialogHeader>
              <UpdateProjectForm
                id={project.id}
                title={project.title}
                setDialogOpen={setEditDialogOpen}
              />
            </DialogContent>
          </Dialog>
          <DropdownMenuItem
            onSelect={() => setShowDeleteProjectModal(true)}
            className="rounded-md font-medium"
          >
            <Trash2Icon className="mr-2 h-4 w-4" />
            Hapus Proyek
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default ProjectCardAction;
