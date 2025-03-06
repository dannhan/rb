"use client";

import * as React from "react";

import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { getErrorMessage } from "@/lib/handle-error";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Icons } from "@/components/icons";
import { createDoc } from "@/lib/firebase/firestore";
import { createDesignImageCategoryAction } from "@/actions/create";

type Props = {
  setIsDialogOpen?: (value: boolean) => void;
  slug: string;
};

export function CreateDesignImageCategoryForm({
  setIsDialogOpen,
  slug,
}: Props) {
  const closeDialog = () => {
    setIsDialogOpen ? setIsDialogOpen(false) : undefined;
  };

  const [isPending, startTransition] = React.useTransition();

  const createDesignImageCategorySchema = z.object({
    name: z.string(),
  });
  const form = useForm<z.infer<typeof createDesignImageCategorySchema>>({
    resolver: zodResolver(createDesignImageCategorySchema),
  });

  const onSubmit = async (
    values: z.infer<typeof createDesignImageCategorySchema>,
  ) => {
    startTransition(async () => {
      try {
        // TODO: might validate the data here
        await createDesignImageCategoryAction({ ...values, slug });

        toast.success("New category has been added.");
        closeDialog();
      } catch (error) {
        const message = getErrorMessage(error);
        toast.error(message);
      }
    });
  };

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="w-full flex-1">
              <FormLabel>Category Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-end">
          <Button type="button" variant="outline" onClick={closeDialog}>
            Cancel
          </Button>
          <Button type="submit" disabled={isPending}>
            {isPending && (
              <Icons.spinnerIcon className="mr-2 h-4 w-4 animate-spin [animation-duration:1250ms]" />
            )}
            Add Category
          </Button>
        </div>
      </form>
    </Form>
  );
}
