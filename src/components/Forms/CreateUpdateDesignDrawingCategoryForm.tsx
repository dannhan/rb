"use client";

import * as React from "react";
import { useParams } from "next/navigation";

import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";

import { addDesignDrawingCategoryFormSchema } from "@/config/formSchema";
import { updateDesignDrawingCategoryAction } from "@/actions/update-project-design-drawing-category";
import { createDesignDrawingCategoryAction } from "@/actions/create-project-design-drawing-category";

import { useDesignDrawingsContext } from "@/components/Providers/DesignDrawingsProvider";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Icons from "@/components/Common/Icons";

type Props = { id: string | null; setShowModal: (value: boolean) => void };

const CreateUpdateDesignDrawingCategoryForm: React.FC<Props> = ({
  id,
  setShowModal,
}) => {
  const params = useParams() as { project: string };
  const { categories, dispatch } = useDesignDrawingsContext();

  const isUpdate = Boolean(id);
  const category = isUpdate ? categories.find((c) => c.id === id) : undefined;
  if (isUpdate && !category) {
    toast.error("Error showing dialog.");
  }

  const actionFn = isUpdate
    ? updateDesignDrawingCategoryAction.bind(null, id!, params)
    : createDesignDrawingCategoryAction.bind(null, params, null);

  const { form, action, handleSubmitWithAction } = useHookFormAction(
    actionFn,
    zodResolver(addDesignDrawingCategoryFormSchema),
    {
      actionProps: {
        onSuccess: ({ data }) => {
          if (data?.result) {
            setShowModal(false);
            toast.success(`Data has been ${isUpdate ? "updated" : "added"}.`);

            dispatch({
              type: isUpdate ? "update" : "create",
              payload: {
                ...data.result,
                imageURLs: category?.imageURLs,
                createdAt: isUpdate
                  ? category!.createdAt
                  : new Date().toISOString(),
              },
            });
          }
        },
        onError: ({ error }) => {
          toast.error("Failed to submit data. Please try again.");
          console.error("Failed to submit data", error);
        },
      },
      formProps: {
        defaultValues: category ?? { title: "" },
      },
    },
  );

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={handleSubmitWithAction}>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="w-full flex-1">
              <FormLabel className="sr-only">Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" disabled={action.isPending} className="w-full">
          {action.isPending && (
            <Icons.spinnerIcon className="mr-2 h-4 w-4 animate-spin [animation-duration:1250ms]" />
          )}
          {isUpdate ? "Save Changes" : "Add Data"}
        </Button>
      </form>
    </Form>
  );
};

export default CreateUpdateDesignDrawingCategoryForm;
