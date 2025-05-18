import { useState } from "react";
import { useParams } from "next/navigation";

import { toast } from "sonner";
import { useAction } from "next-safe-action/hooks";

import { deleteTeamMemberAction } from "@/actions/delete-project-team";

import { useTeamContext } from "@/components/Providers/TeamProvider";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";

const DeleteTeamModal: React.FC<{
  id: string;
  fileKeys?: string[];
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ id, fileKeys, modalOpen, setModalOpen }) => {
  const params = useParams() as { project: string };
  const { dispatch } = useTeamContext();

  const { execute, isPending } = useAction(
    deleteTeamMemberAction.bind(null, params),
    {
      onSuccess: ({ data }) => {
        if (data?.result) {
          setModalOpen(false);
          toast.success("Data deleted successfully");

          dispatch({ type: "delete", payload: id });
        }
      },
      onError: () => {
        toast.error("Failed to delete data.");
      },
    },
  );

  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>This action cannot be undone.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setModalOpen(false)}>
            Cancel
          </Button>
          <Button
            disabled={isPending}
            onClick={() => execute({ id, fileKeys })}
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

type Props = { id: string; fileKeys?: string[] };
export const useDeleteTeamModal = ({ id, fileKeys }: Props) => {
  const [showDeleteTeamModal, setShowDeleteTeamModal] = useState(false);

  return {
    setShowDeleteTeamModal: setShowDeleteTeamModal,
    DeleteTeamModal: () => (
      <DeleteTeamModal
        id={id}
        fileKeys={fileKeys}
        modalOpen={showDeleteTeamModal}
        setModalOpen={setShowDeleteTeamModal}
      />
    ),
  };
};
