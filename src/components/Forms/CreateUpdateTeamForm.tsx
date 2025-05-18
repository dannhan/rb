"use client";

import * as React from "react";
import { useParams } from "next/navigation";

import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";

import { addTeamMemberFormSchema } from "@/config/formSchema";
import { createTeamMemberAction } from "@/actions/create-project-team";
import { updateTeamMemberAction } from "@/actions/update-project-team";

import { cn } from "@/lib/utils/cn";
import { useTeamContext } from "@/components/Providers/TeamProvider";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Icons } from "@/components/icons";

type Props = { id: string | null; setShowModal: (value: boolean) => void };

const CreateUpdateTeamMemberForm: React.FC<Props> = ({ id, setShowModal }) => {
  const params = useParams() as { project: string };
  const { team, dispatch } = useTeamContext();

  const isUpdate = Boolean(id);
  const teamMember = isUpdate ? team.find((t) => t.id === id) : undefined;
  if (isUpdate && !teamMember) {
    toast.error("Error showing dialog.");
  }

  const position = isUpdate
    ? teamMember!.position
    : (team.at(-1)?.position ?? 0) + 1000;
  const actionFn = isUpdate
    ? updateTeamMemberAction.bind(null, id!, params)
    : createTeamMemberAction.bind(null, position, params);

  const { form, action, handleSubmitWithAction } = useHookFormAction(
    actionFn,
    zodResolver(addTeamMemberFormSchema),
    {
      actionProps: {
        onSuccess: ({ data }) => {
          if (data?.result) {
            setShowModal(false);
            toast.success(`Data has been ${isUpdate ? "updated" : "added"}.`);

            // Status is not on the update form, so manually persist the value here
            const status = data.result.status || teamMember!.status;
            dispatch({
              type: isUpdate ? "update" : "create",
              payload: { ...data.result, position, status },
            });
            return;
          }

          toast.error("Failed to submit data. Please try again.");
        },
        onError: ({ error }) => {
          toast.error("Failed to submit data. Please try again.");
          console.error("Failed to submit data", error);
        },
      },
      formProps: {
        defaultValues: teamMember ?? { pekerjaan: "", spk: "", pelaksana: "" },
      },
    },
  );

  return (
    <Form {...form}>
      <form onSubmit={handleSubmitWithAction} className="flex flex-col gap-4">
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
        <FormItem className={cn(isUpdate && "hidden")}>
          <FormLabel>Status</FormLabel>
          <Select disabled value="On Progress">
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
          <Button
            type="button"
            variant="outline"
            onClick={() => setShowModal(false)}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={action.isPending}>
            {action.isPending && (
              <Icons.spinnerIcon className="mr-2 h-4 w-4 animate-spin [animation-duration:1250ms]" />
            )}
            Save Data
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CreateUpdateTeamMemberForm;
