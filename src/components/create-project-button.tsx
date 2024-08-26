import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

type CreateProjectButtonProps = {};

export function CreateProjectButton({}: CreateProjectButtonProps) {
  return (
    <Button
      variant="outline"
      className="flex h-full flex-col gap-2 rounded-lg hover:bg-muted/25"
    >
      <Plus className="h-10 w-10" />
      <span className="text-lg font-semibold">Create a project</span>
    </Button>
  );
}
