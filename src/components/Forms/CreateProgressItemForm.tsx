import { useParams } from "next/navigation";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { PlusCircleIcon } from "lucide-react";

import { nanoid } from "@/lib/utils/nanoid";
import { createProgressItemAction } from "@/actions/create-project-progress";

import { useProgressItemsContext } from "@/components/Providers/ProgressItemsProvider";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

const CreateProgressItemForm: React.FC = () => {
  const params = useParams() as { project: string };
  const { items } = useProgressItemsContext();

  const id = nanoid();
  const position = (items.at(-1)?.position ?? 0) + 1000;
  const { form, handleSubmitWithAction } = useHookFormAction(
    createProgressItemAction.bind(null, id, position, params),
    zodResolver(z.any()),
    {
      actionProps: {
        onSuccess: ({ data }) => {
          if (!data?.result)
            toast.error("Failed to submit data. Please try again.");
        },
        onError: ({ error }) => {
          toast.error("Failed to submit data. Please try again.");
          console.error("Failed to submit data", error);
        },
      },
    },
  );

  return (
    <Form {...form}>
      <form onSubmit={handleSubmitWithAction}>
        <Button type="submit">
          <PlusCircleIcon className="mr-2 size-4" />
          Add Data
        </Button>
      </form>
    </Form>
  );
};

export default CreateProgressItemForm;
