import * as React from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

import { toast } from "sonner";
import { Trash2Icon, PlusCircleIcon } from "lucide-react";

import { Attachment } from "@/types";

import { useUploadFile } from "@/hooks/use-upload-file";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import FileIcons from "@/components/Attachment/FileIcons";
import FileUploader from "@/components/Attachment/FileUploader";
import { deleteProgressAttachmentAction } from "@/actions/delete";

type Props = {
  admin: boolean;
  id: string;
  attachment?: Attachment;
  type: "after" | "before";
  onUpload?: (files: File[]) => Promise<void>;
  progresses?: Record<string, number>;
  isUploading?: boolean;
  deleteAction?: () => Promise<void>;
};

// TODO: make this work
const AttachmentColumn: React.FC<Props> = ({
  admin,
  id,
  attachment,
  type,
  // onUpload,
  // progresses,
  // isUploading,
  // deleteAction,
}) => {
  const params = useParams() as { project: string };
  const router = useRouter();
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);

  // TODO:
  const { onUpload, progresses, isUploading } = useUploadFile("progress", {
    input: {
      projectId: params.project,
      progressId: id,
      type,
    },
    onSuccess: () => router.refresh(),
  });

  const handleDelete = async () => {
    const toastId = toast.loading("Deleting attachment.");
    try {
      if (typeof params?.project !== "string")
        throw new Error("Invalid form data. Please check your inputs.");

      const result = await deleteProgressAttachmentAction(
        attachment?.key,
        params.project,
        id,
        type,
      );

      if (result?.error) {
        toast.error("Failed to delete file.", { id: toastId });
      } else {
        toast.success("File deleted successfully", { id: toastId });
        router.refresh();
      }
    } catch (error) {
      // NOTE: track error
      toast.error("Failed to delete file.", { id: toastId });
    }
  };

  if (attachment) {
    return (
      <div className="flex items-center gap-2">
        <Link
          href={attachment.url}
          target="_blank"
          className="flex h-8 max-w-[200px] items-center overflow-hidden"
        >
          {/* <FileIcons mimeType={attachment.type} /> */}
          <span className="overflow-hidden text-ellipsis whitespace-nowrap text-blue-600">
            {attachment.name}
          </span>
        </Link>
        {admin && (
          <AlertDialog
            open={deleteDialogOpen}
            onOpenChange={setDeleteDialogOpen}
          >
            <AlertDialogTrigger asChild>
              <Button
                size="icon"
                variant="ghost"
                className="h-4 w-4 p-0 opacity-0 transition-opacity group-hover:opacity-100"
              >
                <Trash2Icon className="text-destructive" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>
    );
  }

  if (admin) {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" className="h-8">
            <PlusCircleIcon className="mr-2 h-3.5 w-3.5"></PlusCircleIcon>
            Attach file
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>Upload a file</DialogTitle>
          </DialogHeader>
          <FileUploader
            withToast={false}
            accept={{ "image/*": [] }}
            maxFileCount={64}
            maxSize={32 * 1024 * 1024}
            progresses={progresses}
            onUpload={onUpload}
            disabled={isUploading}
          />
        </DialogContent>
      </Dialog>
    );
  }

  return <span className="italic text-muted-foreground">No Attachment.</span>;
};

export default AttachmentColumn;
