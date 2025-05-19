import { useState, useCallback, useMemo } from "react";
import { useParams } from "next/navigation";

import { toast } from "sonner";
import { useAction } from "next-safe-action/hooks";

import { deleteDesignDrawingImageAction } from "@/actions/delete-project-design-drawing-image";

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
import { Trash2Icon } from "lucide-react";

const DeleteDesignDrawingImageDialog: React.FC<{
  id: string;
  imageURL: string | null;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ id, imageURL, showModal, setShowModal }) => {
  const params = useParams() as { project: string };
  const { dispatch } = useDesignDrawingsContext();

  const { execute, isPending } = useAction(
    deleteDesignDrawingImageAction.bind(null, params),
    {
      onSuccess: ({ data }) => {
        if (data?.result) {
          setShowModal(false);
          toast.success("Image deleted successfully");

          dispatch({
            type: "delete-image",
            payload: { id, imageURL: imageURL! },
          });
        } else {
          toast.error("Failed to delete image.");
        }
      },
      onError: () => {
        toast.error("Error deleting the image.");
      },
    },
  );

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
              if (imageURL !== null) execute({ id, imageURL });
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

const DeleteDesignDrawingImageButton: React.FC<{
  setShowModal: (value: boolean) => void;
}> = ({ setShowModal }) => (
  <Button
    size="icon"
    variant="secondary"
    className="invisible absolute right-4 top-4 z-20 rounded-full opacity-65 hover:bg-secondary hover:opacity-100 group-hover:visible"
    onClick={() => setShowModal(true)}
  >
    <Trash2Icon className="size-4" />
  </Button>
);

type Props = { id: string; imageURL: string | null };
export const useDeleteDesignDrawingImageDialog = ({ id, imageURL }: Props) => {
  const [
    showDeleteDesignDrawingImageDialog,
    setShowDeleteDesignDrawingImageDialog,
  ] = useState(false);

  const DeleteDesignDrawingImageDialogCallback = useCallback(
    () => (
      <DeleteDesignDrawingImageDialog
        id={id}
        imageURL={imageURL}
        showModal={showDeleteDesignDrawingImageDialog}
        setShowModal={setShowDeleteDesignDrawingImageDialog}
      />
    ),
    [id, imageURL, showDeleteDesignDrawingImageDialog],
  );

  const DeleteDesignDrawingImageButtonCallback = useCallback(
    () => (
      <DeleteDesignDrawingImageButton
        setShowModal={setShowDeleteDesignDrawingImageDialog}
      />
    ),
    [],
  );

  return useMemo(
    () => ({
      setShowDeleteDesignDrawingImageDialog,
      DeleteDesignDrawingImageDialog: DeleteDesignDrawingImageDialogCallback,
      DeleteDesignDrawingImageButton: DeleteDesignDrawingImageButtonCallback,
    }),
    [
      setShowDeleteDesignDrawingImageDialog,
      DeleteDesignDrawingImageDialogCallback,
      DeleteDesignDrawingImageButtonCallback,
    ],
  );
};
