"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { identityFormSchema } from "@/config/schema";

import { createIdentityAction } from "@/lib/actions";

import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { PlusIcon } from "lucide-react";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Icons } from "@/components/icons";

type Props = {
  slug: string;
  className?: string;
};

export function CreateIdentityProject({ slug, className }: Props) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const closeDialog = () => {
    open ? setOpen(false) : undefined;
  };

  const form = useForm<z.infer<typeof identityFormSchema>>({
    resolver: zodResolver(identityFormSchema),
    defaultValues: {
      field: "",
      value: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof identityFormSchema>) => {
    startTransition(async () => {
      const formData = new FormData();
      formData.append("value", values.field);
      formData.append("field", values.value);

      const res = await createIdentityAction(slug, formData);

      if (res.errors) {
        toast.error(res.message, { duration: 5000 });
      } else {
        toast.success(res.message, { duration: 5000 });
        router.refresh();
        closeDialog();
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" size="sm" className={cn("h-8", className)}>
          <PlusIcon className="mr-2 size-4" aria-hidden="true" />
          Add Data
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-xl">
        <DialogHeader>
          <DialogTitle>Add Data</DialogTitle>
          <DialogDescription>
            Fill in the details below to add data. Click submit when you&apos;re
            done.
          </DialogDescription>
        </DialogHeader>

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
                      <Input {...field} className="w-full flex-1" />
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
                      <Input {...field} className="w-full flex-1" />
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
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
