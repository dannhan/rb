"use client";

import * as React from "react";
import { useParams } from "next/navigation";

import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { addProgressWeekFormSchema } from "@/config/formSchema";

import { getErrorMessage } from "@/lib/handle-error";
import { addProgressWeekAction } from "@/actions/action-create";

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
import { Icons } from "@/components/icons";

type Props = { setIsDialogOpen: (value: boolean) => void };

const AddWeekForm: React.FC<Props> = ({ setIsDialogOpen }) => {
  const params = useParams();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<z.infer<typeof addProgressWeekFormSchema>>({
    resolver: zodResolver(addProgressWeekFormSchema),
    defaultValues: {
      weekNumber: "",
      date: "",
    },
  });

  const onSubmit = async (
    values: z.infer<typeof addProgressWeekFormSchema>,
  ) => {
    setIsSubmitting(true);
    try {
      if (typeof params?.project !== "string")
        throw new Error("Invalid form data. Please check your inputs.");

      await addProgressWeekAction({
        projectId: params.project,
        week: `${values.weekNumber}_${values.date}`,
      });
      toast.success("New week has been added.");
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
        <FormField
          control={form.control}
          name="weekNumber"
          render={({ field }) => (
            <FormItem className="grid w-full items-center gap-1.5">
              <FormLabel>Week</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="grid w-full items-center gap-1.5">
              <FormLabel>Tanggal</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AddWeekForm;
