import { useState, useCallback, useMemo } from "react";
import { useParams } from "next/navigation";

import { toast } from "sonner";
import { useAction } from "next-safe-action/hooks";

import { deleteDesignDrawingCategoryAction } from "@/actions/delete-project-design-drawing-category";

import { useDesignDrawingsContext } from "@/components/Providers/DesignDrawingsProvider";
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

const DeleteDesignDrawingCategoryModal: React.FC<{
  id: string;
  imageURLs?: string[];
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ id, imageURLs, modalOpen, setModalOpen }) => {
  const params = useParams() as { project: string };
  const { dispatch } = useDesignDrawingsContext();

  const { execute, isPending } = useAction(
    deleteDesignDrawingCategoryAction.bind(null, params),
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
            onClick={() => execute({ id, imageURLs })}
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

type Props = { id: string; imageURLs?: string[] };
export const useDeleteDesignDrawingCategoryModal = ({
  id,
  imageURLs,
}: Props) => {
  const [
    showDeleteDesignDrawingCategoryModal,
    setShowDeleteDesignDrawingCategoryModal,
  ] = useState(false);

  const DeleteDesignDrawingCategoryModalCallback = useCallback(
    () => (
      <DeleteDesignDrawingCategoryModal
        id={id}
        imageURLs={imageURLs}
        modalOpen={showDeleteDesignDrawingCategoryModal}
        setModalOpen={setShowDeleteDesignDrawingCategoryModal}
      />
    ),
    [id, imageURLs, showDeleteDesignDrawingCategoryModal],
  );

  return useMemo(
    () => ({
      setShowDeleteDesignDrawingCategoryModal,
      DeleteDesignDrawingCategoryModal:
        DeleteDesignDrawingCategoryModalCallback,
    }),
    [
      setShowDeleteDesignDrawingCategoryModal,
      DeleteDesignDrawingCategoryModalCallback,
    ],
  );
};
