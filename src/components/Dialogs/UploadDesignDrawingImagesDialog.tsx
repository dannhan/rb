import { useState, useCallback, useMemo } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import DesignDrawingImagesUploader from "@/components/FileUploaders/DesignDrawingImagesUploader";

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

export const useUploadDesignDrawingImagesModal = ({
  id,
  setSelectedId,
}: {
  id: string | null;
  setSelectedId: React.Dispatch<React.SetStateAction<string | null>>;
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
          setSelectedId(null);
          setShowUploadDesignDrawingImagesModal(open);
        }}
      />
    ),
    [id, setSelectedId, showUploadDesignDrawingImagesModal],
  );

  return useMemo(
    () => ({
      setShowUploadDesignDrawingImagesModal,
      UploadDesignDrawingImagesModal: UploadDesignDrawingImagesModalCallback,
    }),
    [
      setShowUploadDesignDrawingImagesModal,
      UploadDesignDrawingImagesModalCallback,
    ],
  );
};
