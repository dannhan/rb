import * as React from "react";
import { useParams } from "next/navigation";

import { toast } from "sonner";
import { useAction } from "next-safe-action/hooks";
import { CheckIcon, CheckCircleIcon, TimerIcon } from "lucide-react";

import { updateTeamMemberStatusAction } from "@/actions/update-project-team";

import { cn } from "@/lib/utils";
import { useRoleContext } from "@/components/Providers/UserRoleProvider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type Props = { id: string; status: "On Progress" | "Finish" | string };
const TeamTableStatusColumn: React.FC<Props> = ({ id, status }) => {
  const [popoverOpen, setPopoverOpen] = React.useState(false);
  const params = useParams() as { project: string };
  const { admin } = useRoleContext();

  const Icon = status === "On Progress" ? TimerIcon : CheckCircleIcon;

  const { execute } = useAction(
    updateTeamMemberStatusAction.bind(null, id, params),
    {
      onError: ({ error }) => {
        toast.error("Failed to submit data. Please try again.");
        console.error("Failed to submit data", error);
      },
    },
  );

  return admin ? (
    <Button
      variant="ghost"
      role="combobox"
      className="h-fit cursor-default justify-between p-0 font-normal"
    >
      <Badge
        variant={status === "Finish" ? "default" : "secondary"}
        className="w-full justify-between px-2 py-1"
      >
        <Icon className="mr-2 h-3 w-3" />
        <span>{status}</span>
      </Badge>
    </Button>
  ) : (
    <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          role="combobox"
          className="h-fit justify-between p-0 font-normal"
        >
          <Badge
            variant={status === "Finish" ? "default" : "secondary"}
            className="w-full justify-between px-2 py-1"
          >
            <Icon className="mr-2 h-3 w-3" />
            <span>{status}</span>
          </Badge>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[140px] p-0">
        <Command>
          <CommandList>
            <CommandGroup>
              {["On Progress", "Finish"].map((value) => (
                <CommandItem
                  key={value}
                  value={value}
                  onSelect={execute}
                  disabled={status === value}
                >
                  <CheckIcon
                    className={cn(
                      "mr-2 h-4 w-4 opacity-0",
                      status === value && "opacity-100",
                    )}
                  />
                  {value}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default TeamTableStatusColumn;
