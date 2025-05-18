"use client";

import Image from "next/image";
import { useProjectImagesContext } from "@/components/Providers/ProjectImagesProvider";

const ImagesBlock = () => {
  const { projectImages } = useProjectImagesContext();
  return (
    <div className="flex flex-col gap-4 pb-4">
      {projectImages.map(({ key, url }) => (
        <div key={key} className="relative h-[480px] rounded-xl bg-muted">
          <Image
            src={url}
            alt="gambar-desain"
            className="object-contain"
            fill
          />
        </div>
      ))}
    </div>
  );
};

export default ImagesBlock;
