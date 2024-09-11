"use client";

import * as React from "react";

import { Noto_Sans_Mono } from "next/font/google";
import { cn } from "@/lib/utils";
import type { ProjectProgress } from "@/types";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { format } from "date-fns";
import { id } from "date-fns/locale";
import { CalendarIcon, CheckIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";

const projectProgressFormSchema = z.object({
  week: z.number(),
  date: z.date(),
  physicalProgress: z.number(),
  costProgress: z.number(),
});

const mono = Noto_Sans_Mono({ subsets: ["latin"] });

type Props = {
  projectProgress: ProjectProgress;
  setIsEditing: (value: boolean) => void;
};

export function ProgressForm({ projectProgress, setIsEditing }: Props) {
  const { week, date, physicalProgress, costProgress } = projectProgress;
  const form = useForm({
    resolver: zodResolver(projectProgressFormSchema),
    defaultValues: { week, date, physicalProgress, costProgress },
  });

  return (
    <Form {...form}>
      <form>
        <FormField
          control={form.control}
          name="week"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative">
                  <span className="absolute left-2 top-[7px] text-lg font-semibold">
                    W
                  </span>
                  <Input
                    {...field}
                    type="number"
                    className="w-[calc(100%-40px)] appearance-none rounded-none bg-transparent p-0 py-0 pl-[26px] text-lg font-semibold leading-[0]"
                    min="0"
                    max="999"
                  />
                </div>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="ghost"
                      className={cn(
                        "w-full justify-start rounded-none border-b px-2 text-left font-normal",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="ml-0 mr-2 h-4 w-4 opacity-50" />
                      {field.value ? (
                        format(field.value, "PPP", { locale: id })
                      ) : (
                        <span>TGL</span>
                      )}
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    locale={id}
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </FormItem>
          )}
        />

        <div className={cn(mono.className, "mt-5 space-y-4")}>
          <FormField
            control={form.control}
            name="physicalProgress"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <>
                    <div className="relative flex items-baseline justify-between">
                      <span className="text-xs">Progres Fisik:</span>
                      <Input
                        {...field}
                        type="number"
                        min="0"
                        max="100"
                        className="h-6 w-12 text-xs"
                      />
                    </div>
                    <WithProgress value={field.value} />
                  </>
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="costProgress"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <>
                    <div className="relative flex items-center justify-between gap-3">
                      <span className="text-xs">Progres Biaya:</span>
                      <Input
                        {...field}
                        type="number"
                        min="0"
                        max="100"
                        className="h-6 w-12 text-xs"
                      />
                    </div>
                    <WithProgress value={field.value} />
                  </>
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-2 text-muted-foreground hover:bg-transparent"
                onClick={() => setIsEditing(false)}
              >
                <CheckIcon className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Save</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </form>
    </Form>
  );
}

function WithProgress({ value }: { value: number }) {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    // const timer = setTimeout(() => setProgress(value), 250);
    // return () => clearTimeout(timer);
    setProgress(value);
  }, []);

  return (
    <Progress
      value={progress}
      className="mt-2 h-2 bg-slate-300 text-yellow-300"
    />
  );
}
