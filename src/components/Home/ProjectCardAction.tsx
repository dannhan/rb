import * as React from "react";

import { toast } from "sonner";
import { EditIcon, MoreHorizontalIcon, Trash2Icon } from "lucide-react";

import type { WithId, Project } from "@/types";

import { cn } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
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
import { Button } from "@/components/ui/button";
import { deleteProjectAction } from "@/actions/action-delete";
import UpdateProjectForm from "../Form/UpdateProjectNameForm";

type Props = {
  project: WithId<Project>;
};

const ProjectCardAction: React.FC<Props> = ({ project }) => {
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const [editDialogOpen, setEditDialogOpen] = React.useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);

  const handleDelete = async () => {
    const toastId = toast.loading("Deleting data.");
    try {
      const result = await deleteProjectAction(project.id);

      if (result?.error) {
        toast.error("Failed to delete data.", { id: toastId });
      } else {
        toast.success("Data deleted successfully", { id: toastId });
      }
    } catch (error) {
      // NOTE: track error
      toast.error("Failed to delete data.", { id: toastId });
    }
  };

  return (
    <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
      <DropdownMenuTrigger asChild>
        {/* TODO: try to change the variant to outline */}
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "absolute right-3 top-5 z-10 h-fit w-fit border p-2 text-muted-foreground opacity-100 transition-all duration-200 hover:bg-muted focus-visible:border-none focus-visible:ring-0 group-hover:opacity-100 lg:rounded-full lg:border-none lg:opacity-0",
            dropdownOpen && "opacity-100",
          )}
        >
          <MoreHorizontalIcon className="h-6 w-6" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="z-50 w-40 rounded-xl px-1.5 py-1 shadow-xl">
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
              projectId={project.id}
              defaultValues={{ title: project.title }}
              onSuccess={() => {
                setEditDialogOpen(false);
                setDropdownOpen(false);
              }}
              onCancel={() => setEditDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogTrigger asChild>
            <DropdownMenuItem
              className="rounded-md font-medium"
              onSelect={(event) => {
                event.preventDefault();
                setDeleteDialogOpen(true);
              }}
            >
              <Trash2Icon className="mr-2 h-4 w-4" />
              Hapus Proyek
            </DropdownMenuItem>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  handleDelete();
                  setDeleteDialogOpen(false);
                  setDropdownOpen(false);
                }}
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProjectCardAction;
