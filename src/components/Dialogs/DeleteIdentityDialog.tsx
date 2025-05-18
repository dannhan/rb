import { useCallback, useMemo, useState } from "react";
import { useParams } from "next/navigation";

import { toast } from "sonner";
import { useAction } from "next-safe-action/hooks";

import { deleteIdentityAction } from "@/actions/delete-project-identity";

import { useIdentitiesContext } from "@/components/Providers/IdentityProvider";
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

const DeleteIdentityDialog: React.FC<{
  id: string;
  dialogOpen: boolean;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ id, dialogOpen, setDialogOpen }) => {
  const params = useParams() as { project: string };
  const { dispatch } = useIdentitiesContext();

  const { execute, isPending } = useAction(
    deleteIdentityAction.bind(null, params),
    {
      onSuccess: ({ data }) => {
        if (data?.result) {
          setDialogOpen(false);
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
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>This action cannot be undone.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setDialogOpen(false)}>
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

export const useDeleteIdentityDialog = ({ id }: { id: string }) => {
  const [showDeleteIdentityModal, setShowDeleteIdentityModal] = useState(false);

  const DeleteIdentityDialogCallback = useCallback(
    () => (
      <DeleteIdentityDialog
        id={id}
        dialogOpen={showDeleteIdentityModal}
        setDialogOpen={setShowDeleteIdentityModal}
      />
    ),
    [id, showDeleteIdentityModal, setShowDeleteIdentityModal],
  );

  return useMemo(
    () => ({
      openDeleteIdentityModal: () => setShowDeleteIdentityModal(true),
      DeleteIdentityDialog: DeleteIdentityDialogCallback,
    }),
    [setShowDeleteIdentityModal, DeleteIdentityDialogCallback],
  );
};
