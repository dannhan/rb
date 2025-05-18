import { useState } from "react";

import { toast } from "sonner";
import { useAction } from "next-safe-action/hooks";

import { deleteProjectAction } from "@/actions/delete-project";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Icons from "@/components/Common/Icons";

const DeleteProjectModal: React.FC<{
  id: string;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ id, showModal, setShowModal }) => {
  const { execute, isPending } = useAction(deleteProjectAction, {
    onSuccess: ({ data }) => {
      if (data?.result) {
        setShowModal(false);
        toast.success("Data deleted successfully");
      }
    },
    onError: () => {
      toast.error("Failed to delete data.");
    },
  });

  return (
    <Dialog open={showModal} onOpenChange={setShowModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>This action cannot be undone.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button
            disabled={isPending}
            onClick={() => {
              execute(id);
            }}
          >
            {isPending && (
              <Icons.spinnerIcon className="mr-2 h-4 w-4 animate-spin [animation-duration:1250ms]" />
            )}
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export const useDeleteProjectModal = ({ id }: { id: string }) => {
  const [showDeleteProjectModal, setShowDeleteProjectModal] = useState(false);

  return {
    setShowDeleteProjectModal,
    DeleteProjectModal: () => (
      <DeleteProjectModal
        id={id}
        showModal={showDeleteProjectModal}
        setShowModal={setShowDeleteProjectModal}
      />
    ),
  };
};
