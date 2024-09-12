"use client";

import { useEffect, useTransition } from "react";
import { useRouter, usePathname } from "next/navigation";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { projectFormSchema } from "@/config/schema";

import NProgress from "nprogress";
import { toast } from "sonner";
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

  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    NProgress.done();
  }, [pathname]);

  const form = useForm<z.infer<typeof projectFormSchema>>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      title: "",
      type: defaultType || "",
    },
  });

  const onSubmit = async (values: z.infer<typeof projectFormSchema>) => {
    startTransition(async () => {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("type", values.type);

      const res = await createProjectAction(formData);

      if (res.errors) {
        toast.error(res.message, { duration: 5000 });
      } else {
        toast.success(res.message, { duration: 5000 });
        NProgress.start();
        router.push(`${res.slug}/identitas-proyek`);
      }
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
            <FormItem className="space-y-1">
              <FormLabel className="text-xs font-normal text-muted-foreground">
                Choose a project type
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="mt-0 rounded-sm border-2 px-2 text-lg">
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
            <FormItem className="space-y-1">
              <FormLabel className="text-xs font-normal text-muted-foreground">
                Project Name
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter the project name"
                  className="col-span-3 rounded-none border-0 border-b-2 px-1 text-2xl focus-visible:ring-offset-0"
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
