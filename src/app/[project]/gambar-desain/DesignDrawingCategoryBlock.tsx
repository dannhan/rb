import Image from "next/image";

import { ImageIcon, ImagesIcon, PlusIcon } from "lucide-react";
import type { WithId, DesignDrawingCategory } from "@/types";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import AnimatedEmptyState from "@/components/Common/AnimatedEmptyState";
import DesignDrawingCategoryActions from "./DesignDrawingCategoryActions";

const DesignDrawingCategoryBlock = ({
  category,
  onEdit,
  onAddImage,
}: {
  category: WithId<DesignDrawingCategory>;
  onEdit: () => void;
  onAddImage: () => void;
}) => (
  <div className="border-t py-4">
    <div className="flex justify-between gap-1 pb-2">
      <div className="flex items-center">
        {process.env.NODE_ENV === "development" && (
          <ImagesIcon className="mr-3 size-5 text-primary" />
        )}
        <h1 className="text-lg font-medium md:text-xl">{category.title}</h1>
      </div>
      <Button
        className="ml-auto rounded-full"
        variant="outline"
        onClick={onAddImage}
      >
        <PlusIcon className="mr-2 size-4" />
        Add Image
      </Button>
      <DesignDrawingCategoryActions id={category.id} onEdit={onEdit} />
    </div>
    {Boolean()}
    {category.imageURLs && category.imageURLs?.length > 0 ? (
      <Carousel className="h-[480px] rounded-xl bg-muted">
        <CarouselContent>
          {category.imageURLs.map((url, index) => (
            <CarouselItem
              key={`${index}-${url}`}
              className="relative h-[480px] w-full"
            >
              <Image
                src={url}
                alt="gambar-desain"
                className="object-contain"
                fill
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-3" />
        <CarouselNext className="right-3" />
      </Carousel>
    ) : (
      <AnimatedEmptyState
        title="No images found"
        className="md:min-h-[100px]"
        description="No images have been created for this category yet."
        cardContent={
          <>
            <ImageIcon className="size-4 text-muted-foreground" />
            <div className="h-2.5 w-24 min-w-0 rounded-sm bg-muted" />
          </>
        }
        addButton={
          <Button
            className="ml-auto rounded-full"
            variant="outline"
            onClick={onAddImage}
          >
            <PlusIcon className="mr-2 size-4" />
            Add Image
          </Button>
        }
      />
    )}
  </div>
);

export default DesignDrawingCategoryBlock;
