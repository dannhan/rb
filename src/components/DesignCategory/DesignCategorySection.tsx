"use client";

import * as React from "react";
import { ImageIcon } from "lucide-react";

import type { WithId, DesignDrawingCategory } from "@/types";

import { useUploadDesignDrawingImagesModal } from "@/components/Dialogs/UploadDesignDrawingImagesDialog";
import AnimatedEmptyState from "@/components/Common/AnimatedEmptyState";
import DesignCategoryActions from "./DesignCategoryActions";
import DesignCategoryImages from "./DesignCategoryImages";

type Props = { category: WithId<DesignDrawingCategory> };
const DesignCategorySection: React.FC<Props> = ({ category }) => {
  const { UploadDesignDrawingImagesButton, UploadDesignDrawingImagesModal } =
    useUploadDesignDrawingImagesModal({ id: category.id });

  return (
    <section className="border-t">
      <UploadDesignDrawingImagesModal />
      <div className="py-4 lg:px-4">
        <div className="flex justify-between gap-1 pb-2 items-center">
          <h1 className="text-lg font-medium md:text-xl">{category.title}</h1>
          <UploadDesignDrawingImagesButton />
          <DesignCategoryActions
            id={category.id}
            imageURLs={category.imageURLs}
          />
        </div>
        {!!category.imageURLs?.length ? (
          <DesignCategoryImages
            categoryId={category.id}
            imageURLs={category.imageURLs || []}
          />
        ) : (
          <AnimatedEmptyState
            title="No images found"
            className="md:min-h-[100px]"
            description="No images have been created for this category yet."
            icon={<ImageIcon className="size-4 text-muted-foreground" />}
            addButton={<UploadDesignDrawingImagesButton />}
          />
        )}
      </div>
    </section>
  );
};

export default DesignCategorySection;
