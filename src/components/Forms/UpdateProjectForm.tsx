"use client";

import * as React from "react";

import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";

import { updateProjectTitleFormSchema } from "@/config/formSchema";
import { updateProjectAction } from "@/actions/update-project";

import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
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
import Icons from "@/components/Common/Icons";

type Props = {
  id: string;
  title: string;
  setDialogOpen: (value: boolean) => void;
};

const UpdateProjectForm: React.FC<Props> = ({ id, title, setDialogOpen }) => {
  const boundUpdateProjectAction = updateProjectAction.bind(null, id);
  const { form, action, handleSubmitWithAction } = useHookFormAction(
    boundUpdateProjectAction,
    zodResolver(updateProjectTitleFormSchema),
    {
      actionProps: {
        onSuccess: () => {
          toast.success("Data has been updated.");
          setDialogOpen(false);
        },
        onError: ({ error }) => {
          toast.error("Failed to update data. Please try again.");
          console.error("Failed to update data", error);
        },
      },
      formProps: {
        defaultValues: { title },
      },
    },
  );

  return (
    <Form {...form}>
      <form onSubmit={handleSubmitWithAction} className="space-y-4">
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
          {/* <Button type="button" variant="outline" onClick={onCancel}> */}
          {/*   Cancel */}
          {/* </Button> */}
          <Button type="submit" variant="default" disabled={action.isPending}>
            {action.isPending && (
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
