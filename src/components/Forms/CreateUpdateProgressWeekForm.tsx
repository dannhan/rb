"use client";

import * as React from "react";
import { useParams } from "next/navigation";

import { format, addWeeks } from "date-fns";
import { id as indo } from "date-fns/locale";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "lucide-react";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";

import { addProgressWeekFormSchema } from "@/config/formSchema";
import { createProgressWeekAction } from "@/actions/create-project-progress";
import { updateProgressWeekAction } from "@/actions/update-project-progress";

import { cn } from "@/lib/utils";
import { useProgressWeeksContext } from "@/components/Providers/ProgressWeeksProvider";
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

type Props = { id: string | null; setShowModal: (value: boolean) => void };
const CreateUpdateProgressWeekForm: React.FC<Props> = ({
  id,
  setShowModal,
}) => {
  const params = useParams() as { project: string };
  const { weeks, dispatch } = useProgressWeeksContext();

  const isUpdate = Boolean(id);
  const currWeek = isUpdate ? weeks.find((w) => w.id === id) : undefined;
  const prevWeek = isUpdate ? null : weeks.at(-1);

  if (isUpdate && !currWeek) {
    toast.error("Error showing dialog.");
  }

  const actionFn = isUpdate
    ? updateProgressWeekAction.bind(null, id!, params)
    : // add null here because the number of params need to be the same
      createProgressWeekAction.bind(null, params, null);

  const { form, action, handleSubmitWithAction } = useHookFormAction(
    actionFn,
    zodResolver(addProgressWeekFormSchema),
    {
      actionProps: {
        onSuccess: ({ data }) => {
          if (data?.result) {
            setShowModal(false);
            toast.success(`Data has been ${isUpdate ? "updated" : "added"}.`);

            dispatch({
              type: isUpdate ? "update" : "create",
              payload: { ...data.result },
            });
          }
        },
        onError: ({ error }) => {
          console.error("Failed to submit data", error);
          toast.error("Failed to submit data. Please try again.");
        },
      },
      formProps: {
        defaultValues: isUpdate
          ? { weekCount: currWeek!.weekCount, date: new Date(currWeek!.date) }
          : prevWeek
            ? {
                weekCount: prevWeek?.weekCount + 1,
                date: addWeeks(new Date(prevWeek.date), 1),
              }
            : { weekCount: 1, date: new Date() },
      },
    },
  );

  return (
    <Form {...form}>
      <form onSubmit={handleSubmitWithAction} className="flex flex-col gap-4">
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
                        format(field.value, "d MMMM yyyy", {
                          locale: indo,
                        })
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
                    locale={indo}
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
            onClick={() => setShowModal(false)}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={action.isPending}>
            New Week
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateUpdateProgressWeekForm;
