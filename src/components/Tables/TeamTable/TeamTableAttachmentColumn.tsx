import Image from "next/image";
import Link from "next/link";

import { PaperclipIcon } from "lucide-react";

import { Attachment } from "@/types";

import { useRoleContext } from "@/components/Providers/UserRoleProvider";
import { Button } from "@/components/ui/button";

type Props = { attachments?: Attachment[]; onUpload: () => void };
const TeamTableAttachmentColumn: React.FC<Props> = ({
  attachments,
  onUpload,
}) => {
  const { admin } = useRoleContext();

  return admin ? (
    attachments ? (
      <div className="flex gap-0.5">
        {attachments.map(({ key, url, type, name }) => (
          <Link key={key} href={url} className="cursor-zoom-in">
            {type.startsWith("image/") ? (
              <Image
                width={122}
                height={32}
                className="max-h-[32px] w-auto rounded-[2px]"
                src={url}
                alt={name}
                quality={1}
              />
            ) : (
              <span>{name}</span>
            )}
          </Link>
        ))}
      </div>
    ) : (
      <Button
        variant="outline"
        className="h-full bg-transparent hover:bg-muted"
        size="sm"
        onClick={onUpload}
      >
        <PaperclipIcon className="mr-2 size-3.5" aria-hidden />
        <span className="text-sm">Attach a file</span>
      </Button>
    )
  ) : (
    <span className="italic text-muted-foreground">No Attachment</span>
  );
};

export default TeamTableAttachmentColumn;
