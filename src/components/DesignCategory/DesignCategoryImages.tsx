import * as React from "react";
import Image from "next/image";

import { ImagesIcon } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { useDeleteDesignDrawingImageDialog } from "@/components//Dialogs/DeleteDesignDrawingImageDialog";

type Props = { categoryId: string; imageURLs: string[] };
const DesignCategoryImages: React.FC<Props> = ({ categoryId, imageURLs }) => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  const { DeleteDesignDrawingImageButton, DeleteDesignDrawingImageDialog } =
    useDeleteDesignDrawingImageDialog({
      id: categoryId,
      imageURL: imageURLs[current - 1],
    });

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
    api.reInit();
  }, [api]);

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
      <DeleteDesignDrawingImageButton />
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
      <CarouselPrevious className="left-3 z-20 disabled:hidden" />
      <CarouselNext className="right-3 z-20 disabled:hidden" />
      <div className="absolute bottom-4 left-1/2 z-50 -translate-x-1/2 whitespace-nowrap rounded-full bg-background px-4 py-2 text-sm">
        Slide {current} of {imageURLs.length}
      </div>
    </Carousel>
  );
};
export default DesignCategoryImages;
