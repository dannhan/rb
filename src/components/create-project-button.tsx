import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

type CreateProjectButtonProps = {};

export function CreateProjectButton({ }: CreateProjectButtonProps) {
  return (
    <Button variant="outline" className="flex flex-col gap-2 rounded-lg h-48 hover:bg-muted/25">
      <Plus className="h-10 w-10"/>
      <span className="text-lg font-semibold">Create a project</span>
    </Button>
  );
}

