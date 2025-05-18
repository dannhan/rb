"use client";

import * as React from "react";

import { ImagesIcon } from "lucide-react";
import { useDesignDrawingsContext } from "@/components/Providers/DesignDrawingsProvider";
import { useCreateUpdateDesignDrawingCategoryModal } from "@/components/Dialogs/CreateUpdateDesignDrawingCategoryDialog";
import { useUploadDesignDrawingImagesModal } from "@/components/Dialogs/UploadDesignDrawingImagesDialog";
import { Input } from "@/components/ui/input";
import AnimatedEmptyState from "@/components/Common/AnimatedEmptyState";
import DesignDrawingCategoryBlock from "./DesignDrawingCategoryBlock";

const DesignDrawingClient: React.FC = () => {
  const [selectedId, setSelectedId] = React.useState<string | null>(null);

  const { designDrawingCategories } = useDesignDrawingsContext();
  const {
    setShowCreateUpdateDesignDrawingModal,
    CreateUpdateDesignDrawingCategoryModal,
    CreateDesignDrawingCategoryButton,
  } = useCreateUpdateDesignDrawingCategoryModal({
    id: selectedId,
    setSelectedId,
  });
  const {
    setShowUploadDesignDrawingImagesModal,
    UploadDesignDrawingImagesModal,
  } = useUploadDesignDrawingImagesModal({
    id: selectedId,
    setSelectedId,
  });

  return (
    <div className="flex flex-col gap-4">
      <CreateUpdateDesignDrawingCategoryModal />
      <UploadDesignDrawingImagesModal />
      <div className="flex justify-between">
        <Input className="max-w-96" placeholder="Search by category..." />
        <CreateDesignDrawingCategoryButton />
      </div>
      {designDrawingCategories.length === 0 ? (
        <AnimatedEmptyState
          title="No category found"
          description="No category have been created for this project yet."
          cardContent={
            <>
              <ImagesIcon className="size-4 text-muted-foreground" />
              <div className="h-2.5 w-24 min-w-0 rounded-sm bg-muted" />
            </>
          }
          addButton={<CreateDesignDrawingCategoryButton />}
        />
      ) : (
        designDrawingCategories.map((category) => (
          <DesignDrawingCategoryBlock
            key={category.id}
            category={category}
            onEdit={() => {
              setSelectedId(category.id);
              setShowCreateUpdateDesignDrawingModal(true);
            }}
            onAddImage={() => {
              setSelectedId(category.id);
              setShowUploadDesignDrawingImagesModal(true);
            }}
          />
        ))
      )}
    </div>
  );
};

export default DesignDrawingClient;
