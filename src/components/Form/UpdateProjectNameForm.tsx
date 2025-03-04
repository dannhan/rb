"use client";

import * as React from "react";

import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { updateProjectTitleFormSchema } from "@/config/formSchema";

import { getErrorMessage } from "@/lib/handle-error";
import { updateProjectTitleAction } from "@/actions/action-update";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Icons } from "@/components/icons";

// TODO: might change the props to just project
type Props = {
  projectId: string;
  defaultValues: z.infer<typeof updateProjectTitleFormSchema>;
  onSuccess?: () => void;
  onCancel?: () => void;
};

const UpdateProjectForm: React.FC<Props> = ({
  projectId,
  defaultValues,
  onSuccess,
  onCancel,
}) => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<z.infer<typeof updateProjectTitleFormSchema>>({
    resolver: zodResolver(updateProjectTitleFormSchema),
    defaultValues,
  });

  const onSubmit = async (
    values: z.infer<typeof updateProjectTitleFormSchema>,
  ) => {
    setIsSubmitting(true);
    try {
      await updateProjectTitleAction({
        id: projectId,
        title: values.title,
      });
      toast.success("Data updated successfully.");

      // Call the onSuccess function if provided
      onSuccess?.();
    } catch (error) {
      const message = getErrorMessage(error);
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex w-full space-x-2">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full flex-1">
                <FormLabel className="sr-only">Title</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-end">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" variant="default" disabled={isSubmitting}>
            {isSubmitting && (
              <Icons.spinnerIcon className="mr-2 h-4 w-4 animate-spin [animation-duration:1250ms]" />
            )}
            <span>Simpan</span>
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default UpdateProjectForm;
