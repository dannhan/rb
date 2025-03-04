"use client";

import * as React from "react";

import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import type { Identity } from "@/types";
import { identitySchema } from "@/config/dataSchema";

import { getErrorMessage } from "@/lib/handle-error";
import { createIdentityAction } from "@/actions/create";
import { updateIdentityAction } from "@/actions/update";

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

type IdentitiFormPropsBase = {
  setIsDialogOpen?: (value: boolean) => void;
  slug: string;
};

type IdentityFormProps =
  | (IdentitiFormPropsBase & { isUpdate?: false; data?: undefined })
  | (IdentitiFormPropsBase & { isUpdate: true; data: Identity });

export function IdentityForm({
  setIsDialogOpen,
  slug,
  isUpdate,
  data,
}: IdentityFormProps) {
  const [isPending, startTransition] = React.useTransition();

  const closeDialog = () => {
    setIsDialogOpen ? setIsDialogOpen(false) : undefined;
  };

  const defaultValues = isUpdate
    ? {
        field: data.field,
        value: data.value,
      }
    : {
        field: "",
        value: "",
      };

  const identityFormSchema = identitySchema.pick({
    field: true,
    value: true,
  });
  const form = useForm<z.infer<typeof identityFormSchema>>({
    resolver: zodResolver(identityFormSchema),
    defaultValues,
  });

  const onSubmit = async (values: z.infer<typeof identityFormSchema>) => {
    startTransition(async () => {
      try {
        if (!isUpdate) {
          await createIdentityAction({ ...values, slug: slug });
          toast.success("New data has been added.");
        } else {
          await updateIdentityAction({ ...values, id: data.id, slug: slug });
          toast.success("Data has been updated.");
        }
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
        <div className="flex w-full space-x-2">
          <FormField
            control={form.control}
            name="field"
            render={({ field }) => (
              <FormItem className="w-full flex-1">
                <FormLabel className="sr-only">Field</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="value"
            render={({ field }) => (
              <FormItem className="w-full flex-1">
                <FormLabel className="sr-only">Value</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-end">
          <Button type="button" variant="outline" onClick={closeDialog}>
            Cancel
          </Button>
          <Button type="submit" disabled={isPending}>
            {isPending && (
              <Icons.spinnerIcon className="mr-2 h-4 w-4 animate-spin [animation-duration:1250ms]" />
            )}
            Save Data
          </Button>
        </div>
      </form>
    </Form>
  );
}
