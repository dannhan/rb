"use client";

import * as React from "react";
import { useParams } from "next/navigation";

import { format } from "date-fns";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "lucide-react";

import { addProgressWeekFormSchema } from "@/config/formSchema";
import { addProgressWeekAction } from "@/actions/create";

import { getErrorMessage } from "@/lib/handle-error";

import { cn } from "@/lib/utils";
import { useProgressContext } from "@/components/Providers/ProgressContext";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Icons } from "@/components/icons";

type Props = { setIsDialogOpen: (value: boolean) => void };

// WARN:
// TODO: date
const AddWeekForm: React.FC<Props> = ({ setIsDialogOpen }) => {
  const params = useParams();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const { weeks } = useProgressContext();

  const form = useForm<z.infer<typeof addProgressWeekFormSchema>>({
    resolver: zodResolver(addProgressWeekFormSchema),
    defaultValues: { weekCount: (weeks.at(-1)?.weekCount ?? 0) + 1 },
  });

  const onSubmit = async (
    values: z.infer<typeof addProgressWeekFormSchema>,
  ) => {
    setIsSubmitting(true);
    try {
      if (typeof params?.project !== "string")
        throw new Error("Invalid form data. Please check your inputs.");

      await addProgressWeekAction(params.project, values);
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
          name="weekCount"
          render={({ field }) => (
            <FormItem className="grid w-full items-center gap-1.5">
              <FormLabel>Week</FormLabel>
              <FormControl>
                <Input {...field} type="number" min={1} />
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
              {/* <FormControl> */}
              {/*   <Input {...field} /> */}
              {/* </FormControl> */}
              <Popover modal={true}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
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
