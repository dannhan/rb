import { useState, useCallback, useMemo } from "react";

import { PlusCircleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import CreateUpdateProgressWeekForm from "@/components/Forms/CreateUpdateProgressWeekForm";

const CreateUpdateProgressWeekModal: React.FC<{
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
      <CreateUpdateProgressWeekForm id={id} setShowModal={setShowModal} />
    </DialogContent>
  </Dialog>
);

const CreateProgressWeekButton: React.FC<{
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setShowModal }) => {
  return (
    <Button variant="default" onClick={() => setShowModal(true)}>
      <PlusCircleIcon className="mr-2 size-4" aria-hidden="true" />
      New Week
    </Button>
  );
};

export const useCreateUpdateProgressWeekModal = ({
  id,
  setSelectedId,
}: {
  id: string | null;
  setSelectedId: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  const [
    showCreateUpdateProgressWeekModal,
    setShowCreateUpdateProgressWeekModal,
  ] = useState(false);

  const CreateUpdateProgressWeekModalCallback = useCallback(
    () => (
      <CreateUpdateProgressWeekModal
        id={id}
        showModal={showCreateUpdateProgressWeekModal}
        setShowModal={(open) => {
          setSelectedId(null);
          setShowCreateUpdateProgressWeekModal(open);
        }}
      />
    ),
    [id, setSelectedId, showCreateUpdateProgressWeekModal],
  );

  const CreateProgressWeekButtonCallback = useCallback(
    () => (
      <CreateProgressWeekButton
        setShowModal={setShowCreateUpdateProgressWeekModal}
      />
    ),
    [],
  );

  return useMemo(
    () => ({
      setShowCreateUpdateProgressWeekModal,
      CreateUpdateProgressWeekModal: CreateUpdateProgressWeekModalCallback,
      CreateProgressWeekButton: CreateProgressWeekButtonCallback,
    }),
    [
      setShowCreateUpdateProgressWeekModal,
      CreateUpdateProgressWeekModalCallback,
      CreateProgressWeekButtonCallback,
    ],
  );
};
