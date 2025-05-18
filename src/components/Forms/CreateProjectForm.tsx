"use client";

import * as React from "react";
import { usePathname } from "next/navigation";

import NProgress from "nprogress";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";

import { createProjectFormSchema } from "@/config/formSchema";
import { createProjectAction } from "@/actions/create-project";

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

type Props = { defaultType?: "renovasi" | "konstruksi" };

const CreateProjectForm: React.FC<Props> = ({ defaultType }) => {
  const pathname = usePathname();

  React.useEffect(() => {
    NProgress.done();
  }, [pathname]);

  const { form, action, handleSubmitWithAction } = useHookFormAction(
    createProjectAction,
    zodResolver(createProjectFormSchema),
    {
      actionProps: {
        onSuccess: () => {
          NProgress.start();
          toast.success("Project has been created.");
        },
        onError: ({ error }) => {
          toast.error("Failed to create project. Please try again.");
          console.error("Failed to create project", error);
        },
      },
      formProps: { defaultValues: { title: "", type: defaultType } },
    },
  );

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmitWithAction}
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
          disabled={action.isPending}
        >
          {action.isPending && (
            <Icons.spinnerIcon className="mr-2 h-4 w-4 animate-spin [animation-duration:1250ms]" />
          )}
          Continue
        </Button>
      </form>
    </Form>
  );
};

export default CreateProjectForm;
