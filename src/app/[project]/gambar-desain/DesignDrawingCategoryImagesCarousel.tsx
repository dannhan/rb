import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type Props = { imageURLs: string[] };
const DesignDrawingCategoryImagesCarousel: React.FC<Props> = (props) => {
  return (
    <Carousel>
      <CarouselContent>
        {props.imageURLs.map((url) => (
          <CarouselItem key={url}>
            <Image
              src={url}
              alt="gambar-desain"
              className="mx-auto max-h-[640px] min-h-[640px] w-auto rounded-xl object-contain"
              width={1200}
              height={640}
              priority={true}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-3 z-50" />
      <CarouselNext className="right-3 z-50" />
    </Carousel>
  );
};
export default DesignDrawingCategoryImagesCarousel;
