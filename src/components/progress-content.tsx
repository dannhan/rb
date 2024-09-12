"use client";

import * as React from "react";

import { Noto_Sans_Mono } from "next/font/google";
import { cn } from "@/lib/utils";
import type { ProjectProgress } from "@/types";

import { format } from "date-fns";
import { id } from "date-fns/locale";
import { CalendarIcon, EditIcon, MoreHorizontal, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import { toast } from "sonner";

const mono = Noto_Sans_Mono({ subsets: ["latin"] });

type Props = {
  setIsEditing: (value: boolean) => void;
  projectProgress: ProjectProgress;
};

export function ProgressContent({ projectProgress, setIsEditing }: Props) {
  return (
    <>
      <h3 className="pl-2 text-lg font-semibold leading-10">
        W{projectProgress.week}
      </h3>

      <Button
        variant="ghost"
        className={cn(
          "w-full cursor-default justify-start rounded-none border-b px-2 text-left font-normal",
        )}
      >
        <CalendarIcon className="ml-0 mr-2 h-4 w-4 opacity-50" />
        {projectProgress.date ? (
          format(projectProgress.date, "PPP", { locale: id })
        ) : (
          <span>TGL</span>
        )}
      </Button>

      <div className={cn(mono.className, "mt-5 space-y-4")}>
        <div className="space-y-2">
          <div className="relative flex items-baseline justify-between">
            <span className="text-xs font-medium">Progres Fisik:</span>
            <p className="font-semibold">{projectProgress.physicalProgress}%</p>
          </div>
          <WithProgress value={projectProgress.physicalProgress} />
        </div>

        <div className="space-y-2">
          <div className="relative flex items-center justify-between gap-3">
            <span className="text-xs font-medium">Progres Biaya:</span>
            <p className="font-semibold">{projectProgress.costProgress}%</p>
          </div>
          <WithProgress value={projectProgress.costProgress} />
        </div>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2 rounded-full text-muted-foreground focus-visible:ring-1"
          >
            <MoreHorizontal className="h-4 w-4 " />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem onClick={() => setIsEditing(true)}>
            <EditIcon className="mr-2.5 h-4 w-4" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => toast.error("Function not implemented.")}
          >
            <Trash2 className="mr-2.5 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

function WithProgress({ value }: { value: number }) {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(value), 250);
    return () => clearTimeout(timer);
  }, []);

  return <Progress value={progress} className="mt-2 h-2 bg-slate-300" />;
}
