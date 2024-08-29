"use client";

import { useTransition } from "react";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { projectSchema } from "@/config/schema";

import { createProjectAction } from "@/lib/actions";

import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";

type CreateProjectFormProps = {
  defaultType?: string;
};

export function CreateProjectForm({ defaultType }: CreateProjectFormProps) {
  const [isPending, startTransition] = useTransition();

  const formSchema = projectSchema.omit({ slug: true });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      type: defaultType || "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    startTransition(async () => {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("type", values.type);

      const res = await createProjectAction(formData);
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        action={createProjectAction}
        className="flex max-w-screen-md flex-col gap-8 sm:px-10"
      >
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="hidden">Tipe Proyek</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="rounded-sm border-2 text-lg">
                    <SelectValue placeholder="Select project type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="konstruksi">Konstruksi</SelectItem>
                  <SelectItem value="renovasi">Renovasi</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="hidden">Nama Proyek</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter the project name"
                  className="col-span-3 rounded-none border-0 border-b-2 text-xl focus-visible:ring-offset-0"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="sm:ml-auto sm:h-11 sm:px-8"
          size="sm"
          disabled={isPending}
        >
          {isPending && (
            <Icons.spinnerIcon className="mr-2 h-4 w-4 animate-spin [animation-duration:1250ms]" />
          )}
          Continue
        </Button>
      </form>
    </Form>
  );
}
