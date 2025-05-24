"use client";

import Image from "next/image";
import { useProjectImagesContext } from "@/components/Providers/ProjectImagesProvider";

const ImagesBlock = () => {
  const { projectImages } = useProjectImagesContext();

  if (projectImages.length === 0) return;

  return (
    <div className="flex flex-col gap-4 pb-4">
      {projectImages.map(({ key, url }) => (
        <div key={key} className="overflow-hidden rounded-xl bg-muted">
          <Image
            src={url}
            alt="gambar-desain"
            className="mx-auto max-h-[720px] object-contain"
            width={1200}
            height={720}
          />
        </div>
      ))}
    </div>
  );
};

export default ImagesBlock;
