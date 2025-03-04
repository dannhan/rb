import * as React from "react";
import { useParams } from "next/navigation";

import { debounce } from "lodash";

import { createColumnHelper, type ColumnDef } from "@tanstack/react-table";
import type { WithId, ProgressItem } from "@/types";

import { Input } from "@/components/ui/input";
import {
  updateProgressItemDescriptionAction,
  updateProgressValueAction,
} from "@/actions/action-update";

const columnHelper = createColumnHelper<WithId<ProgressItem>>();

const getColumns = (
  progressItems: WithId<ProgressItem>[],
  newInputRef?: React.MutableRefObject<HTMLInputElement | null>,
) =>
  React.useMemo<ColumnDef<WithId<ProgressItem>, any>[]>(() => {
    // Extract unique week keys from progress objects
    // PERF: expensive operation
    const weekKeys = Array.from(
      new Set(progressItems.flatMap((item) => Object.keys(item.progress))),
    );

    return [
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
              className="h-full w-full cursor-pointer border-0 bg-transparent px-3 focus-visible:ring-offset-0"
              placeholder="Add description..."
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
                {weekNumber}
                <div className="text-xs font-normal text-gray-500">{date}</div>
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
                min="0"
                max="100"
                step="5"
              />
            );
          },
        }),
      ),
    ];
  }, [progressItems]);

export default getColumns;
