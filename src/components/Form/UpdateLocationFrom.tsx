"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { CornerDownLeftIcon } from "lucide-react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { ProjectLocation } from "@/types";
import { createProjectLocationFormSchema } from "@/config/formSchema";

import { getErrorMessage } from "@/lib/handle-error";
import { uploadFiles } from "@/lib/uploadthing";
import { updateProjectLocationWithoutImageAction } from "@/actions/action-update";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Icons } from "@/components/icons";
import FileUploader from "@/components/Attachment/FileUploader";

type Props = { projectId: string; location: ProjectLocation };

const UpdateLocationForm: React.FC<Props> = ({ projectId, location }) => {
  const router = useRouter();
  const [isImageRemoved, setIsImageRemoved] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [preview, setPreview] = React.useState<string | null>(
    location.image?.url || null,
  );

  const form = useForm<z.infer<typeof createProjectLocationFormSchema>>({
    resolver: zodResolver(createProjectLocationFormSchema),
    defaultValues: {
      detailAddress: location.detailAddress,
      link: location.link,
    },
  });

  const onSubmit = async (
    values: z.infer<typeof createProjectLocationFormSchema>,
  ) => {
    setIsSubmitting(true);
    try {
      const response = values.image
        ? (
          await uploadFiles("location", {
            files: [values.image],
            input: {
              projectId,
              oldImageKey: isImageRemoved ? location.image?.key : undefined,
              detailAddress: values.detailAddress,
              link: values.link,
            },
          })
        )[0].serverData
        : await updateProjectLocationWithoutImageAction({
          projectId,
          values: {
            link: values.link,
            detailAddress: values.detailAddress,
            image: isImageRemoved ? undefined : location.image,
          },
          oldImageKey: isImageRemoved ? location.image?.key : undefined,
        });
      if (!response?.success) throw new Error(response?.error);

      toast.success("New data has been updated.");
      router.push("lokasi");
      router.refresh();
    } catch (error) {
      console.log({ error });
      const message = getErrorMessage(error);
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        <FormField
          control={form.control}
          name="detailAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Alamat</FormLabel>
              <FormControl>
                <Textarea
                  className="bg-transparent"
                  placeholder="Masukkan detail alamat lengkap"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="link"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Link Map</FormLabel>
              <FormControl>
                <Input
                  type="url"
                  className="bg-transparent"
                  placeholder="https://maps.google.com/..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center justify-between">
                <span>Gambar Lokasi</span>
                {preview && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-fit w-fit font-normal text-muted-foreground hover:bg-transparent hover:text-foreground"
                    onClick={() => {
                      setPreview(null);
                      location.image && setIsImageRemoved(true);
                    }}
                  >
                    Remove
                  </Button>
                )}
              </FormLabel>
              <FormControl>
                {preview ? (
                  <div className="relative aspect-video overflow-hidden rounded-md border">
                    <img
                      src={preview}
                      alt="Preview lokasi"
                      className="h-full w-full object-cover"
                    />
                  </div>
                ) : (
                  <FileUploader
                    maxSize={32 * 1024 * 1024}
                    withToast={false}
                    withProgressIndicators={false}
                    onValueChange={(files) => {
                      const file = files[0];
                      field.onChange(file);
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = (e) =>
                          setPreview(e.target?.result as string);
                        reader.readAsDataURL(file);
                      } else {
                        setPreview(null);
                      }
                    }}
                  />
                )}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="outline"
            size="lg"
            className="px-4"
            disabled={isSubmitting}
            asChild
          >
            <Link href="lokasi">Batal</Link>
          </Button>
          <Button
            type="submit"
            size="lg"
            className="px-4"
            disabled={isSubmitting}
          >
            {isSubmitting && (
              <Icons.spinnerIcon className="mr-2 h-4 w-4 animate-spin [animation-duration:1250ms]" />
            )}
            Simpan Lokasi
            <div className="ml-2 rounded border border-border/40 p-1">
              <CornerDownLeftIcon className="h-3.5 w-3.5" />
            </div>
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default UpdateLocationForm;
