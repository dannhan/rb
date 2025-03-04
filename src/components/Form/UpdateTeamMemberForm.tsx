"use client";

import * as React from "react";
import { useParams } from "next/navigation";

import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { updateTeamMemberFormSchema } from "@/config/formSchema";

import { getErrorMessage } from "@/lib/handle-error";
import { updateTeamMemberAction } from "@/actions/action-update";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Icons } from "@/components/icons";

type Props = {
  teamId: string;
  defaultValues: z.infer<typeof updateTeamMemberFormSchema>;
  setDialogOpen: (value: boolean) => void;
};

const UpdateTeamMemberForm: React.FC<Props> = ({
  teamId,
  defaultValues,
  setDialogOpen,
}) => {
  const params = useParams();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<z.infer<typeof updateTeamMemberFormSchema>>({
    resolver: zodResolver(updateTeamMemberFormSchema),
    defaultValues,
  });

  const onSubmit = async (
    values: z.infer<typeof updateTeamMemberFormSchema>,
  ) => {
    setIsSubmitting(true);
    try {
      // this just to ensure that the type of params.project is always string
      // not string[] or undefined, technically this should be done at server
      // but this is more like for typescript reason rather than security
      if (typeof params?.project !== "string")
        throw new Error("Invalid form data. Please check your inputs.");

      // TODO: there is bug here, when the path is not exist it just return success
      await updateTeamMemberAction({
        projectId: params.project,
        teamId,
        values,
      });
      toast.success("Data updated successfully.");
      setDialogOpen(false);
    } catch (error) {
      const message = getErrorMessage(error);
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
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
        <div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={() => setDialogOpen(false)}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && (
              <Icons.spinnerIcon className="mr-2 h-4 w-4 animate-spin [animation-duration:1250ms]" />
            )}
            Save Data
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default UpdateTeamMemberForm;
