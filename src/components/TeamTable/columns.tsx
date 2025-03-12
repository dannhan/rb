import * as React from "react";
import { useParams } from "next/navigation";

import { toast } from "sonner";
import { CheckIcon, EllipsisIcon, EditIcon, Trash2Icon } from "lucide-react";
import type { ColumnDef } from "@tanstack/react-table";
import type { WithId, TeamMember } from "@/types";

import { updateTeamMemberStatusAction } from "@/actions/update";
import { deleteTeamMemberAction } from "@/actions/delete";

import { teamTableConfig } from "@/config/table";

import { cn } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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

import { Icons } from "@/components/icons";
import UpdateTeamMemberForm from "@/components/Form/UpdateTeamMemberForm";
import TableColumnHeader from "@/components/TableFeatures/TableColumnHeader";

// TODO: use size for width if possible
const getColumns = (admin: boolean): ColumnDef<WithId<TeamMember>, any>[] =>
  React.useMemo(() => {
    const columns: ColumnDef<WithId<TeamMember>, any>[] = [
      {
        id: "no",
        enableSorting: true,
        enableHiding: false,
        header: ({ column }) => (
          <TableColumnHeader column={column} title="No." />
        ),
        cell: ({ row }) => (
          <span className="text-muted-foreground">{`${row.index + 1}`}</span>
        ),
      },
      {
        accessorKey: "pekerjaan",
        header: ({ column }) => (
          <TableColumnHeader column={column} title="Pekerjaan" />
        ),
        cell: ({ row }) => (
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("pekerjaan")}
          </span>
        ),
      },
      {
        accessorKey: "spk",
        header: ({ column }) => (
          <TableColumnHeader column={column} title="SPK" />
        ),
        cell: ({ row }) => (
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("spk")}
          </span>
        ),
      },
      {
        accessorKey: "pelaksana",
        header: ({ column }) => (
          <TableColumnHeader column={column} title="Pelaksana" />
        ),
        cell: ({ row }) => (
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("pelaksana")}
          </span>
        ),
      },
      {
        accessorKey: "status",
        filterFn: (row, id, value) => value.includes(row.getValue(id)),
        header: ({ column }) => (
          <TableColumnHeader column={column} title="Status" />
        ),
        cell: ({ row }) => {
          const params = useParams();
          const [popoverOpen, setPopoverOpen] = React.useState(false);

          const status = teamTableConfig.statuses.find(
            (status) => status.value === row.original.status,
          );

          if (!status) return null;
          const Icon = Icons[status.icon || "circle"];

          if (admin && process.env.NODE_ENV === "production") {
            return (
              <Badge
                variant={status.value === "Finish" ? "default" : "secondary"}
              >
                {status.icon && <Icon className="mr-2 h-3 w-3" />}
                <span>{status.label}</span>
              </Badge>
            );
          }

          const handleSelect = async (selectedValue: string) => {
            try {
              if (typeof params?.project !== "string")
                throw new Error("Invalid form data. Please check your inputs.");

              await updateTeamMemberStatusAction({
                projectId: params.project,
                teamId: row.original.id,
                status: selectedValue,
              });
              setPopoverOpen(false);
            } catch (error) {
              toast.error("Error updating status.");
            }
          };

          return (
            <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  role="combobox"
                  className="h-fit justify-between p-0 font-normal"
                >
                  <Badge
                    variant={
                      status.value === "Finish" ? "default" : "secondary"
                    }
                    className="w-full justify-between px-2 py-1"
                  >
                    {status.icon && <Icon className="mr-2 h-3 w-3" />}
                    <span>{status.label}</span>
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
                          onSelect={handleSelect}
                          disabled={status.value === value}
                        >
                          <CheckIcon
                            className={cn(
                              "mr-2 h-4 w-4 opacity-0",
                              status.value === value && "opacity-100",
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
        },
      },
      // TODO: add file upload column here
    ];

    // Conditionally add the "Actions" column if admin is true
    if (admin) {
      columns.push({
        id: "actions",
        cell: ({ row }) => {
          const params = useParams();
          const [editDialogOpen, setEditDialogOpen] = React.useState(false);
          const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);

          const { id, pekerjaan, spk, pelaksana } = row.original;

          const handleDelete = async () => {
            const toastId = toast.loading("Deleting data.");
            try {
              if (typeof params?.project !== "string")
                throw new Error("Invalid form data. Please check your inputs.");

              const result = await deleteTeamMemberAction(
                row.original.id,
                params.project,
              );

              if (result?.error) {
                toast.error("Failed to delete data.", { id: toastId });
              } else {
                toast.success("Data deleted successfully", { id: toastId });
              }
            } catch (error) {
              // NOTE: track error
              toast.error("Failed to delete data.", { id: toastId });
            }
          };

          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
                >
                  <EllipsisIcon className="h-4 w-4" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                collisionPadding={{ bottom: 100 }}
                align="end"
                className="w-[160px]"
              >
                <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
                  <DialogTrigger asChild>
                    <DropdownMenuItem
                      onSelect={(event) => {
                        event.preventDefault();
                        setEditDialogOpen(true);
                      }}
                    >
                      <EditIcon className="mr-2.5 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Data</DialogTitle>
                      <DialogDescription>
                        Fill in the details below to update data.
                      </DialogDescription>
                    </DialogHeader>
                    <UpdateTeamMemberForm
                      teamId={id}
                      defaultValues={{ pekerjaan, spk, pelaksana }}
                      setDialogOpen={setEditDialogOpen}
                    />
                  </DialogContent>
                </Dialog>
                <AlertDialog
                  open={deleteDialogOpen}
                  onOpenChange={setDeleteDialogOpen}
                >
                  <AlertDialogTrigger asChild>
                    <DropdownMenuItem
                      onSelect={(event) => {
                        event.preventDefault();
                        setDeleteDialogOpen(true);
                      }}
                    >
                      <Trash2Icon className="mr-2.5 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleDelete}>
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      });
    }

    return columns;
  }, [admin]);

export default getColumns;
