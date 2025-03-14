"use client";

import * as React from "react";
import { useParams } from "next/navigation";

import { toast } from "sonner";

import type { Attachment } from "@/types";
import { updateAttachmentDescriptionAction } from "@/actions/update";

import { Input } from "@/components/ui/input";

type Props = { attachment: Attachment };

// TODO: improve this
const ImageCardDescription = ({ attachment }: Props) => {
  const { description } = attachment;
  const { project: projectId } = useParams() as { project: string };
  const [inputValue, setInputValue] = React.useState(description || "");
  const measureRef = React.useRef<HTMLSpanElement>(null);

  const offsetWidth = measureRef.current?.offsetWidth;
  const width = offsetWidth ? `${Math.max(197, offsetWidth + 20)}px` : "100%";

  const handleSave = async () => {
    try {
      const result = await updateAttachmentDescriptionAction({
        projectId,
        attachmentId: attachment.key,
        description: inputValue,
      });

      if (result?.error) {
        toast.error("Failed to update data.");
      }
    } catch (error) {
      toast.error("Failed to update data.");
    }
  };

  return (
    <div className="relative mb-0.5 pl-1">
      <div className="relative inline-block w-full">
        {/* Hidden span to measure text width */}
        <span
          ref={measureRef}
          className="invisible absolute whitespace-pre px-1 text-lg"
          aria-hidden="true"
        >
          {inputValue || "Masukkan deskripsi"}
        </span>
        <div className="relative flex items-center overflow-x-visible">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onBlur={async () => await handleSave()}
            placeholder="Masukkan deskripsi"
            className="col-span-3 mb-1 h-auto cursor-pointer border-transparent bg-transparent px-1 py-0 text-lg hover:border hover:border-foreground/60 focus-visible:hover:border-transparent"
            style={{ width }}
          />
        </div>
      </div>
    </div>
  );
};

export default ImageCardDescription;
