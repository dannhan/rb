import { useState, useCallback, useMemo } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import DesignDrawingImagesUploader from "@/components/FileUploaders/DesignDrawingImagesUploader";
import { PlusIcon } from "lucide-react";

const UploadDesignDrawingImagesModal: React.FC<{
  id: string | null;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ id, showModal, setShowModal }) => (
  <Dialog
    open={showModal}
    onOpenChange={(open) => {
      if (!open) {
        setShowModal(false);
      }
    }}
  >
    <DialogContent className="w-full max-w-xl">
      <DialogHeader>
        <DialogTitle>Upload Images</DialogTitle>
      </DialogHeader>
      <DesignDrawingImagesUploader id={id} setShowModal={setShowModal} />
    </DialogContent>
  </Dialog>
);

const UploadDesignDrawingImagesButton: React.FC<{
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setShowModal }) => {
  return (
    <Button
      className="ml-auto rounded-full"
      variant="outline"
      onClick={() => setShowModal(true)}
    >
      <PlusIcon className="mr-2 size-4" />
      Add Image
    </Button>
  );
};

export const useUploadDesignDrawingImagesModal = ({
  id,
  setSelectedId,
}: {
  id: string | null;
  setSelectedId?: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  const [
    showUploadDesignDrawingImagesModal,
    setShowUploadDesignDrawingImagesModal,
  ] = useState(false);

  const UploadDesignDrawingImagesModalCallback = useCallback(
    () => (
      <UploadDesignDrawingImagesModal
        id={id}
        showModal={showUploadDesignDrawingImagesModal}
        setShowModal={(open) => {
          setSelectedId?.(null);
          setShowUploadDesignDrawingImagesModal(open);
        }}
      />
    ),
    [id, setSelectedId, showUploadDesignDrawingImagesModal],
  );

  const UploadDesignDrawingImagesButtonCallback = useCallback(
    () => (
      <UploadDesignDrawingImagesButton
        setShowModal={setShowUploadDesignDrawingImagesModal}
      />
    ),
    [],
  );

  return useMemo(
    () => ({
      setShowUploadDesignDrawingImagesModal,
      UploadDesignDrawingImagesModal: UploadDesignDrawingImagesModalCallback,
      UploadDesignDrawingImagesButton: UploadDesignDrawingImagesButtonCallback,
    }),
    [
      setShowUploadDesignDrawingImagesModal,
      UploadDesignDrawingImagesModalCallback,
      UploadDesignDrawingImagesButtonCallback,
    ],
  );
};
