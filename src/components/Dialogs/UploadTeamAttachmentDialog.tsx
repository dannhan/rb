import { useState, useCallback, useMemo } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import TeamAttachmentUploader from "@/components/FileUploaders/TeamAttachmentUploader";

const UploadTeamAttachmentModal: React.FC<{
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
        <DialogTitle>Upload Files</DialogTitle>
      </DialogHeader>
      <TeamAttachmentUploader id={id} setShowModal={setShowModal} />
    </DialogContent>
  </Dialog>
);

export const useUploadTeamAttachmentModal = ({
  id,
  setSelectedId,
}: {
  id: string | null;
  setSelectedId: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  const [showUploadTeamAttachmentModal, setShowUploadTeamAttachmentModal] =
    useState(false);

  const UploadTeamAttachmentModalCallback = useCallback(
    () => (
      <UploadTeamAttachmentModal
        id={id}
        showModal={showUploadTeamAttachmentModal}
        setShowModal={(open) => {
          setSelectedId(null);
          setShowUploadTeamAttachmentModal(open);
        }}
      />
    ),
    [id, setSelectedId, showUploadTeamAttachmentModal],
  );

  return useMemo(
    () => ({
      setShowUploadTeamAttachmentModal,
      UploadTeamAttachmentModal: UploadTeamAttachmentModalCallback,
    }),
    [setShowUploadTeamAttachmentModal, UploadTeamAttachmentModalCallback],
  );
};
