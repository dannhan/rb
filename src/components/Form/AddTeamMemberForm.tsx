"use client";

import * as React from "react";
import { useParams } from "next/navigation";

import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { addTeamMemberFormSchema } from "@/config/formSchema";
import { addTeamMemberAction } from "@/actions/create";

import { getErrorMessage } from "@/lib/handle-error";

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

type Props = { setDialogOpen: (value: boolean) => void };

const AddTeamMemberForm: React.FC<Props> = ({ setDialogOpen }) => {
  const params = useParams();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<z.infer<typeof addTeamMemberFormSchema>>({
    resolver: zodResolver(addTeamMemberFormSchema),
    defaultValues: { pekerjaan: "", spk: "", pelaksana: "" },
  });

  const onSubmit = async (values: z.infer<typeof addTeamMemberFormSchema>) => {
    setIsSubmitting(true);
    try {
      // this just to ensure that the type of params.project is always string
      // not string[] or undefined, technically this should be done at server
      // but this is more like for typescript reason rather than security
      if (typeof params?.project !== "string")
        throw new Error("Invalid form data. Please check your inputs.");

      await addTeamMemberAction(values, params.project);
      toast.success("New data has been added.");
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
        <FormItem>
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

export default AddTeamMemberForm;
