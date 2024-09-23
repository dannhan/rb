"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";

import { createTeamAction, updateTeamAction } from "@/lib/actions";

import { Team } from "@/types";
import { teamFormSchema } from "@/config/schema";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";

type TeamFormPropsBase = {
  setIsDialogOpen?: (value: boolean) => void;
  slug: string;
};

type TeamFormProps =
  | (TeamFormPropsBase & { isUpdate?: false; data?: undefined })
  | (TeamFormPropsBase & { isUpdate: true; data: Team });

export default function TeamForm({
  setIsDialogOpen,
  slug,
  isUpdate,
  data,
}: TeamFormProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const closeDialog = () => {
    setIsDialogOpen ? setIsDialogOpen(false) : undefined;
  };

  const defaultValues = isUpdate
    ? {
        pekerjaan: data.pekerjaan,
        pelaksana: data.pelaksana,
        spk: data.spk,
        status: data.status,
      }
    : {
        pekerjaan: "",
        pelaksana: "",
        spk: "",
        status: "On Progress",
      };

  const form = useForm<z.infer<typeof teamFormSchema>>({
    resolver: zodResolver(teamFormSchema),
    defaultValues,
  });

  const onSubmit = async (values: z.infer<typeof teamFormSchema>) => {
    startTransition(async () => {
      const formData = new FormData();
      formData.append("pekerjaan", values.pekerjaan);
      formData.append("pelaksana", values.pelaksana);
      formData.append("spk", values.spk);

      const res = isUpdate
        ? await updateTeamAction(slug, data.no, formData)
        : await createTeamAction(slug, formData);

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
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="pekerjaan"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pekerjaan</FormLabel>
              <FormControl>
                <Input placeholder="Pekerjaan" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="spk"
          render={({ field }) => (
            <FormItem>
              <FormLabel>SPK</FormLabel>
              <FormControl>
                <Input placeholder="SPK" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="pelaksana"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pelaksana</FormLabel>
              <FormControl>
                <Input placeholder="Pelaksana" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select A Status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="On Progress">On Progress</SelectItem>
                  <SelectItem value="Finish">Finish</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

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
