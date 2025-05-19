"use client";

import { useCreateUpdateDesignDrawingCategoryModal } from "@/components/Dialogs/CreateUpdateDesignDrawingCategoryDialog";

const AddDesignCategoryButton = () => {
  const {
    CreateUpdateDesignDrawingCategoryModal,
    CreateDesignDrawingCategoryButton,
  } = useCreateUpdateDesignDrawingCategoryModal({ id: null });
  return (
    <>
      <CreateUpdateDesignDrawingCategoryModal />
      <CreateDesignDrawingCategoryButton />
    </>
  );
};

export default AddDesignCategoryButton;
