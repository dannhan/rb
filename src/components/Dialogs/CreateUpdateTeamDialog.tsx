import { useState, useCallback, useMemo } from "react";

import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import CreateUpdateTeamMemberForm from "@/components/Forms/CreateUpdateTeamForm";

const CreateUpdateTeamModal: React.FC<{
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
        <DialogTitle>{id ? "Edit" : "Create New"} Data</DialogTitle>
        <DialogDescription>
          Fill in the details below to {id ? "edit" : "create new"} data. Click
          save when you&apos;re done.
        </DialogDescription>
      </DialogHeader>
      <CreateUpdateTeamMemberForm id={id} setShowModal={setShowModal} />
    </DialogContent>
  </Dialog>
);

const CreateTeamButton: React.FC<{
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setShowModal }) => {
  return (
    <Button variant="default" onClick={() => setShowModal(true)}>
      <PlusIcon className="mr-2 size-4" aria-hidden="true" />
      Add Data
    </Button>
  );
};

export const useCreateUpdateTeamModal = ({
  id,
  setSelectedId,
}: {
  id: string | null;
  setSelectedId: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  const [showCreateUpdateTeamModal, setShowCreateUpdateTeamModal] =
    useState(false);

  const CreateUpdateTeamModalCallback = useCallback(
    () => (
      <CreateUpdateTeamModal
        id={id}
        showModal={showCreateUpdateTeamModal}
        setShowModal={(open) => {
          setSelectedId(null);
          setShowCreateUpdateTeamModal(open);
        }}
      />
    ),
    [id, setSelectedId, showCreateUpdateTeamModal],
  );

  const CreateTeamButtonCallback = useCallback(
    () => <CreateTeamButton setShowModal={setShowCreateUpdateTeamModal} />,
    [],
  );

  return useMemo(
    () => ({
      setShowCreateUpdateTeamModal,
      CreateUpdateTeamModal: CreateUpdateTeamModalCallback,
      CreateTeamButton: CreateTeamButtonCallback,
    }),
    [
      setShowCreateUpdateTeamModal,
      CreateUpdateTeamModalCallback,
      CreateTeamButtonCallback,
    ],
  );
};
