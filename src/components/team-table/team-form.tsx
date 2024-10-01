"use client";

import * as React from "react";

import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import type { Team } from "@/types";
import { teamSchema } from "@/config/schema";

import { getErrorMessage } from "@/lib/handle-error";
import { createTeamAction } from "@/actions/create";
import { updateTeamAction } from "@/actions/update";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Icons } from "@/components/icons";

type TeamFormPropsBase = {
  setIsDialogOpen?: (value: boolean) => void;
  slug: string;
};

type TeamFormProps =
  | (TeamFormPropsBase & { isUpdate?: false; data?: undefined })
  | (TeamFormPropsBase & { isUpdate: true; data: Team });

export function TeamForm({
  setIsDialogOpen,
  slug,
  isUpdate,
  data,
}: TeamFormProps) {
  const [isPending, startTransition] = React.useTransition();

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

  const teamFormSchema = teamSchema.pick({
    pekerjaan: true,
    spk: true,
    pelaksana: true,
  });
  const form = useForm<z.infer<typeof teamFormSchema>>({
    resolver: zodResolver(teamFormSchema),
    defaultValues,
  });

  const onSubmit = async (values: z.infer<typeof teamFormSchema>) => {
    startTransition(async () => {
      try {
        if (!isUpdate) {
          await createTeamAction({ ...values, slug: slug });
          toast.success("New data has been added.");
        } else {
          await updateTeamAction({ ...values, id: data.id, slug: slug });
          toast.success("Data has been updated.");
        }
        closeDialog();
      } catch (error) {
        const message = getErrorMessage(error);
        toast.error(message);
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
        <FormItem>
          <FormLabel>Status</FormLabel>
          <Select disabled>
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
