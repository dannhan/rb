import * as React from "react";
import { useParams } from "next/navigation";

import { debounce } from "lodash";
import { toast } from "sonner";
import { EditIcon, EllipsisIcon, Trash2Icon } from "lucide-react";

import { createColumnHelper, type ColumnDef } from "@tanstack/react-table";
import type { WithId, ProgressItem, ProgressWeek } from "@/types";

import {
  updateProgressItemDescriptionAction,
  updateProgressValueAction,
} from "@/actions/update";
import { deleteProgressItemAction } from "@/actions/delete";

import { useMediaQuery } from "@/hooks/use-media-query";
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
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

import AttachmentColumn from "./ProgressTableAttachmentColumn";
import { format } from "date-fns";
import { useProgressContext } from "../Providers/ProgressContext";

const columnHelper = createColumnHelper<WithId<ProgressItem>>();

const getColumns = (
  admin: boolean,
  weeks: WithId<ProgressWeek>[],
  // newInputIdRef: React.MutableRefObject<string | null>,
) =>
  React.useMemo<ColumnDef<WithId<ProgressItem>, any>[]>(() => {
    const columns = [
      // Correctly display the row number
      columnHelper.display({
        id: "no",
        header: "No.",
        size: 20,
        cell: ({ row }) => (
          <span className="text-muted-foreground">{`${row.index + 1}`}</span>
        ),
      }),

      // TODO: check again
      columnHelper.accessor("attachment", {
        id: "attachment",
        header: () => <span>Attachment</span>,
        cell: ({ row }) => {
          const attachment = row.original.attachment;
          return (
            <div className="flex flex-col items-start gap-2">
              <AttachmentColumn
                admin={admin}
                id={row.original.id}
                attachment={attachment?.before}
                type="before"
              />
              <Separator />
              <AttachmentColumn
                admin={admin}
                id={row.original.id}
                attachment={attachment?.after}
                type="after"
              />
            </div>
          );
        },
      }),

      // Description column
      columnHelper.accessor("description", {
        header: "Description",
        size: 180,
        cell: ({ row }) => {
          const [dropdownOpen, setDropdownOpen] = React.useState(false);
          const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
          const [value, setValue] = React.useState(row.original.description);
          const params = useParams() as { project: string };
          const isDesktop = useMediaQuery("(min-width: 768px)");
          const { shouldFocus, setShouldFocus } = useProgressContext();

          // NOTE: not sure about the empty dependency array
          const inputRef = React.useRef<HTMLInputElement>(null);
          React.useEffect(() => {
            if (shouldFocus) {
              inputRef.current?.focus();
              setShouldFocus(false);
            }
          }, []);

          const handleMouseDown = (e: React.MouseEvent) => {
            e.preventDefault();
            inputRef.current?.focus();
          };

          const handleBlur = async () => {
            if (value !== row.original.description) {
              try {
                await updateProgressItemDescriptionAction(params.project, {
                  id: row.original.id,
                  description: value,
                });
              } catch (error) {
                console.error("Failed to update description:", error);
              }
            }
          };

          const handleDelete = async () => {
            const toastId = toast.loading("Deleting data.");
            setDropdownOpen(false);
            try {
              if (typeof params?.project !== "string")
                throw new Error("Invalid form data. Please check your inputs.");

              const result = await deleteProgressItemAction(
                params.project,
                row.original,
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
            <div
              onMouseDown={handleMouseDown}
              className="group relative flex h-full cursor-pointer items-center"
            >
              <Input
                ref={inputRef}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onBlur={handleBlur}
                placeholder={admin ? "Add description..." : "No Description"}
                className={cn(
                  "peer w-full cursor-pointer border-0 bg-transparent px-3 focus-visible:ring-offset-0",
                  "disabled:cursor-default disabled:opacity-100",
                )}
              />
              <div className="absolute right-2 peer-focus-within:invisible">
                <DropdownMenu
                  open={dropdownOpen}
                  onOpenChange={setDropdownOpen}
                >
                  <DropdownMenuTrigger asChild>
                    <Button
                      onMouseDown={(e) => e.preventDefault()} // Prevent stealing focus
                      variant="ghost"
                      className="flex h-10 w-10 p-0 data-[state=open]:bg-muted"
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
                    <DropdownMenuItem
                      onSelect={(event) => {
                        event.preventDefault(); // Prevent auto-close behavior
                        setDropdownOpen(false); // Close the dropdown
                        requestAnimationFrame(() => inputRef.current?.focus());
                      }}
                    >
                      <EditIcon className="mr-2.5 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    {isDesktop ? (
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
                    ) : (
                      <Drawer
                        open={deleteDialogOpen}
                        onOpenChange={setDeleteDialogOpen}
                      >
                        <DrawerTrigger asChild>
                          <DropdownMenuItem
                            onSelect={(event) => {
                              event.preventDefault();
                              setDeleteDialogOpen(true);
                            }}
                          >
                            <Trash2Icon className="mr-2.5 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DrawerTrigger>
                        <DrawerContent>
                          <DrawerHeader>
                            <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                            <DrawerDescription>
                              This action cannot be undone.
                            </DrawerDescription>
                          </DrawerHeader>
                          <DrawerFooter>
                            <DrawerClose asChild>
                              <Button variant="outline">Cancel</Button>
                            </DrawerClose>
                            <Button
                              variant="destructive"
                              onClick={handleDelete}
                            >
                              Continue
                            </Button>
                          </DrawerFooter>
                        </DrawerContent>
                      </Drawer>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          );
        },
      }),

      // Weeks Columns
      ...weeks.map(({ id: weekId, weekCount, date }) =>
        columnHelper.accessor((row) => row.progress[weekId] || 0, {
          id: `week-${weekId}`,
          size: 40,
          header: () => {
            return (
              <>
                W{weekCount}
                {/* TWO "&nbsp" is used to consistently render blank space without affacting layout */}
                <div className="text-xs font-normal text-gray-500">
                  &nbsp;{format(new Date(date), "dd-MM-yy")}&nbsp;
                </div>
              </>
            );
          },
          cell: ({ row }) => {
            const params = useParams() as { project: string };
            const [value, setValue] = React.useState(
              row.original.progress[weekId] || 0,
            );

            // Debounced server update (executes after 500ms of inactivity)
            const updateServer = React.useCallback(
              debounce(async (value: number) => {
                try {
                  await updateProgressValueAction(params.project, {
                    id: row.original.id,
                    weekId,
                    value,
                  });
                } catch (error) {
                  console.error("Failed to update progress:", error);
                }
              }, 300),
              [],
            );

            function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
              const newValue = parseFloat(e.target.value) || 0;
              setValue(newValue);
              updateServer(newValue); // Update immediately on change
            }

            function handleBlur() {
              updateServer.flush(); // Ensure the last value is sent on blur
            }

            return (
              <Input
                type="number"
                value={value}
                onChange={handleChange}
                onBlur={handleBlur}
                className={cn(
                  "h-full w-full cursor-pointer border-0 bg-transparent text-center focus-visible:ring-2 focus-visible:ring-offset-0",
                  !admin &&
                    "[appearance:textfield] disabled:cursor-default disabled:opacity-100 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
                )}
                step="5"
                disabled={!admin}
              />
            );
          },
        }),
      ),
    ];
    return columns;
  }, [weeks.length]);

export default getColumns;
