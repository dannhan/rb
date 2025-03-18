import Link from "next/link";

import { LinkIcon, ImageIcon, MapPinnedIcon } from "lucide-react";

import { ProjectLocation } from "@/types";
import { cn } from "@/lib/utils";

type Props = { location: ProjectLocation | undefined };

const LocationDetails: React.FC<Props> = ({ location }: Props) => {
  return (
    <div className="flex flex-col gap-7">
      <div className="space-y-2">
        <h4 className="flex items-center gap-2 text-sm font-medium">
          <MapPinnedIcon className="h-4 w-4" />
          Alamat
        </h4>
        <p
          className={cn(
            "whitespace-pre-line rounded-md bg-muted/10",
            !location?.detailAddress && "italic text-muted-foreground",
          )}
        >
          {location?.detailAddress || "No data."}
        </p>
      </div>
      <div className="space-y-2">
        <h4 className="flex items-center gap-2 text-sm font-medium">
          <LinkIcon className="h-4 w-4" />
          Link Map
        </h4>
        {location?.link ? (
          <a
            href={location.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block break-all rounded-md bg-muted/10 text-blue-600 hover:underline"
          >
            {location.link}
          </a>
        ) : (
          <p className="text-sm font-medium italic text-muted-foreground">
            No Data.
          </p>
        )}
      </div>
      {location?.image ? (
        <div className="relative aspect-video overflow-hidden rounded-md border bg-muted/20">
          <img
            src={location.image.url}
            alt="Preview lokasi"
            className="h-full w-full object-cover"
          />
          <Link
            href={location.image.url}
            className="absolute top-0 z-10 h-full w-full"
            target="_blank"
          />
        </div>
      ) : (
        <div className="flex aspect-video flex-col items-center justify-center rounded-md border bg-muted/20 p-6">
          <ImageIcon className="mb-2 h-10 w-10 text-muted-foreground" />
          <p className="text-center text-sm text-muted-foreground">
            {!location
              ? "Unggah gambar untuk melihat preview"
              : "Tidak ada gambar lokasi"}
          </p>
        </div>
      )}
    </div>
  );
};

export default LocationDetails;
