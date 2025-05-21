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
import CreateUpdateIdentityForm from "@/components/Forms/CreateUpdateIdentityForm";

const CreateUpdateIdentityModal: React.FC<{
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
      <CreateUpdateIdentityForm id={id} setShowModal={setShowModal} />
    </DialogContent>
  </Dialog>
);

const CreateIdentityButton: React.FC<{
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setShowModal }) => {
  return (
    <Button variant="default" onClick={() => setShowModal(true)}>
      <PlusIcon className="mr-2 size-4" aria-hidden="true" />
      Add Data
    </Button>
  );
};

export const useCreateUpdateIdentityModal = ({
  id,
  setSelectedId,
}: {
  id: string | null;
  setSelectedId?: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  const [showCreateUpdateIdentityModal, setShowCreateUpdateIdentityModal] =
    useState(false);

  const CreateUpdateIdentityModalCallback = useCallback(
    () => (
      <CreateUpdateIdentityModal
        id={id}
        showModal={showCreateUpdateIdentityModal}
        setShowModal={(open) => {
          setSelectedId?.(null);
          setShowCreateUpdateIdentityModal(open);
        }}
      />
    ),
    [id, setSelectedId, showCreateUpdateIdentityModal],
  );

  const CreateIdentityButtonCallback = useCallback(
    () => (
      <CreateIdentityButton setShowModal={setShowCreateUpdateIdentityModal} />
    ),
    [],
  );

  return useMemo(
    () => ({
      setShowCreateUpdateIdentityModal,
      CreateUpdateIdentityModal: CreateUpdateIdentityModalCallback,
      CreateIdentityButton: CreateIdentityButtonCallback,
    }),
    [
      setShowCreateUpdateIdentityModal,
      CreateUpdateIdentityModalCallback,
      CreateIdentityButtonCallback,
    ],
  );
};
