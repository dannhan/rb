import * as React from "react";
import { useParams } from "next/navigation";

import { debounce } from "lodash";

import { createColumnHelper, type ColumnDef } from "@tanstack/react-table";
import type { WithId, ProgressItem } from "@/types";
import {
  updateProgressItemDescriptionAction,
  updateProgressValueAction,
} from "@/actions/update";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

const columnHelper = createColumnHelper<WithId<ProgressItem>>();

const getColumns = (
  admin: boolean,
  progressItems: WithId<ProgressItem>[],
  weekKeys: string[],
  newInputRef?: React.MutableRefObject<HTMLInputElement | null>,
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
      columnHelper.accessor("description", {
        header: "Description",
        size: 180,
        cell: ({ row }) => {
          const params = useParams();
          const [value, setValue] = React.useState(row.original.description);

          async function handleBlur() {
            // NOTE: still running if it previously has been changed
            if (value !== row.original.description) {
              try {
                await updateProgressItemDescriptionAction({
                  projectId: params.project as string,
                  progressId: row.original.id,
                  description: value,
                });
              } catch (error) {
                console.error("Failed to update description:", error);
              }
            }
          }

          return (
            <Input
              ref={(el) => {
                if (value === "" && newInputRef) {
                  newInputRef.current = el;
                }
              }}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onBlur={handleBlur}
              className={cn(
                "h-full w-full cursor-pointer border-0 bg-transparent px-3 focus-visible:ring-offset-0",
                "disabled:cursor-default disabled:opacity-100",
              )}
              placeholder={admin ? "Add description..." : "No description"}
              disabled
            />
          );
        },
      }),
      // Weeks Columns
      ...weekKeys.map((week) =>
        columnHelper.accessor((row) => row.progress[week] || 0, {
          id: `week-${week}`,
          size: 40,
          header: () => {
            const [weekNumber, date] = week.split("_");
            return (
              <>
                W{weekNumber}
                {/* TWO "&nbsp" is used to consistently render blank space without affacting layout */}
                <div className="text-xs font-normal text-gray-500">
                  &nbsp;{date}&nbsp;
                </div>
              </>
            );
          },
          cell: ({ row }) => {
            const params = useParams();
            const [value, setValue] = React.useState(
              row.original.progress[week] || 0,
            );

            // Debounced server update (executes after 500ms of inactivity)
            const updateServer = React.useCallback(
              debounce(async (newValue: number) => {
                try {
                  await updateProgressValueAction({
                    projectId: params.project as string,
                    progressId: row.original.id,
                    week: week,
                    value: newValue,
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
                className="h-full w-full cursor-pointer border-0 bg-transparent text-center focus-visible:ring-2 focus-visible:ring-offset-0"
                step="5"
              />
            );
          },
        }),
      ),
    ];
    return columns;
  }, [progressItems]);

export default getColumns;
