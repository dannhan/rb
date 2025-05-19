import * as React from "react";

import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogContent,
} from "@/components/ui/dialog";
import CreateUpdateDesignDrawingCategoryForm from "@/components/Forms/CreateUpdateDesignDrawingCategoryForm";

const CreateUpdateDesignDrawingCategoryModal: React.FC<{
  id: string | null;
  showModal: boolean;
  setShowModal: (value: boolean) => void;
}> = ({ id, showModal, setShowModal }) => {
  return (
    <Dialog
      open={showModal}
      onOpenChange={(open) => {
        if (!open) {
          setShowModal(false);
        }
      }}
    >
      <DialogContent className="w-full max-w-md">
        <DialogHeader>
          <DialogTitle className="font-medium">
            {id ? "Edit" : "Create New"} Category
          </DialogTitle>
        </DialogHeader>
        <CreateUpdateDesignDrawingCategoryForm
          id={id}
          setShowModal={setShowModal}
        />
      </DialogContent>
    </Dialog>
  );
};

const CreateDesignDrawingCategoryButton: React.FC<{
  setShowModal: (value: boolean) => void;
}> = ({ setShowModal }) => (
  <Button onClick={() => setShowModal(true)}>
    <PlusIcon className="mr-2 size-4" />
    Create Category
  </Button>
);

export const useCreateUpdateDesignDrawingCategoryModal = ({
  id,
  setSelectedId,
}: {
  id: string | null;
  setSelectedId?: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  const [
    showCreateUpdateDesignDrawingCategoryModal,
    setShowCreateUpdateDesignDrawingCategoryModal,
  ] = React.useState(false);

  const CreateUpdateDesignDrawingCategoryModalCallback = React.useCallback(
    () => (
      <CreateUpdateDesignDrawingCategoryModal
        id={id}
        showModal={showCreateUpdateDesignDrawingCategoryModal}
        setShowModal={(open) => {
          setSelectedId?.(null);
          setShowCreateUpdateDesignDrawingCategoryModal(open);
        }}
      />
    ),
    [id, setSelectedId, showCreateUpdateDesignDrawingCategoryModal],
  );

  const CreateDesignDrawingCategoryButtonCallback = React.useCallback(
    () => (
      <CreateDesignDrawingCategoryButton
        setShowModal={setShowCreateUpdateDesignDrawingCategoryModal}
      />
    ),
    [],
  );

  return React.useMemo(
    () => ({
      setShowCreateUpdateDesignDrawingCategoryModal,
      CreateUpdateDesignDrawingCategoryModal:
        CreateUpdateDesignDrawingCategoryModalCallback,
      CreateDesignDrawingCategoryButton:
        CreateDesignDrawingCategoryButtonCallback,
    }),
    [
      setShowCreateUpdateDesignDrawingCategoryModal,
      CreateUpdateDesignDrawingCategoryModalCallback,
      CreateDesignDrawingCategoryButtonCallback,
    ],
  );
};
