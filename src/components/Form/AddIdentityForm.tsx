"use client";

import * as React from "react";
import { useParams } from "next/navigation";

import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { addIdentityFormSchema } from "@/config/formSchema";
import { addIdentityAction } from "@/actions/create";

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

type Props = { setIsDialogOpen: (value: boolean) => void };

const AddIdentityForm: React.FC<Props> = ({ setIsDialogOpen }) => {
  const params = useParams();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<z.infer<typeof addIdentityFormSchema>>({
    resolver: zodResolver(addIdentityFormSchema),
    defaultValues: { field: "", value: "" },
  });

  const onSubmit = async (values: z.infer<typeof addIdentityFormSchema>) => {
    setIsSubmitting(true);
    try {
      if (typeof params?.project !== "string")
        throw new Error("Invalid form data. Please check your inputs.");

      await addIdentityAction(values, params.project);
      toast.success("New data has been added.");
      setIsDialogOpen(false);
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
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsDialogOpen(false)}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && (
              <Icons.spinnerIcon className="mr-2 h-4 w-4 animate-spin [animation-duration:1250ms]" />
            )}
            Save Data
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AddIdentityForm;
