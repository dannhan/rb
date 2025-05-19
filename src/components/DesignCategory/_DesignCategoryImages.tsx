import * as React from "react";
import Image from "next/image";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ImagesIcon,
  Trash2Icon,
} from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { useDeleteDesignDrawingImageDialog } from "@/components//Dialogs/DeleteDesignDrawingImageDialog";

type Props = { categoryId: string; imageURLs: string[] };
const DesignCategoryImages: React.FC<Props> = ({ categoryId, imageURLs }) => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  const {
    setShowDeleteDesignDrawingImageDialog,
    DeleteDesignDrawingImageDialog,
  } = useDeleteDesignDrawingImageDialog({
    id: categoryId,
    imageURL: imageURLs[current],
  });

  return (
    <Carousel className="group overflow-hidden rounded-xl" setApi={setApi}>
      <DeleteDesignDrawingImageDialog />
      <Button
        variant="secondary"
        className="invisible absolute left-4 top-4 z-20 rounded-full opacity-65 hover:bg-secondary hover:opacity-100 group-hover:visible"
      >
        <ImagesIcon className="mr-2 size-4" />
        <span className="font-semibold">Add</span>
      </Button>
      <Button
        size="icon"
        variant="secondary"
        className="invisible absolute right-4 top-4 z-20 rounded-full opacity-65 hover:bg-secondary hover:opacity-100 group-hover:visible"
        onClick={() => setShowDeleteDesignDrawingImageDialog(true)}
      >
        <Trash2Icon className="size-4" />
      </Button>
      <CarouselContent>
        {imageURLs.map((url) => (
          <CarouselItem
            key={url}
            className="relative max-h-[480px] w-full overflow-hidden"
          >
            <div className="absolute left-0 -z-20 h-full w-full bg-black/20" />
            <Image
              src={url}
              alt=""
              fill
              className="-z-10 scale-105 object-cover opacity-40 blur-3xl"
              aria-hidden="true"
              priority
            />
            <Image
              src={url}
              alt="gambar-desain"
              className="h-full max-h-[480px] object-contain"
              width={1200}
              height={640}
              priority={true}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <Button
        variant="outline"
        size="icon"
        className="absolute left-3 top-1/2 z-20 h-8 w-8 -translate-y-1/2 rounded-full disabled:hidden"
        disabled={!(current > 1)}
        onClick={() => {
          if (current > 1) setCurrent((prev) => prev - 1);
          api?.scrollPrev();
        }}
      >
        <ChevronLeftIcon className="h-4 w-4" />
        <span className="sr-only">Previous slide</span>
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="absolute right-3 top-1/2 z-20 h-8 w-8 -translate-y-1/2 rounded-full disabled:hidden"
        disabled={!(current + 1 < imageURLs.length)}
        onClick={() => {
          if (current + 1 < imageURLs.length) setCurrent((prev) => prev + 1);
          api?.scrollNext();
        }}
      >
        <ChevronRightIcon className="h-4 w-4" />
        <span className="sr-only">Next slide</span>
      </Button>
      <div className="absolute bottom-4 left-1/2 z-50 -translate-x-1/2 whitespace-nowrap rounded-full bg-background px-4 py-2 text-sm">
        Slide {current + 1} of {imageURLs.length}
      </div>
    </Carousel>
  );
};
export default DesignCategoryImages;
