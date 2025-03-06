"use client";

import * as React from "react";

import { format } from "date-fns";
import { Plus, MoreHorizontal } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

interface Item {
  id: string;
  no: number;
  description: string;
  progress: Record<string, string>;
}

interface Week {
  id: string;
  weekNumber: number;
  date: string;
}

export default function Sample() {
  const [items, setItems] = React.useState<Item[]>([
    {
      id: "1",
      no: 1,
      description: "This is first description",
      progress: {},
    },
  ]);

  const [weeks, setWeeks] = React.useState<Week[]>([
    {
      id: "W11",
      weekNumber: 11,
      date: "18-08-23",
    },
    {
      id: "W12",
      weekNumber: 12,
      date: "25-08-23",
    },
  ]);

  const addNewItem = () => {
    const newItem: Item = {
      id: crypto.randomUUID(),
      no: items.length + 1,
      description: "",
      progress: weeks.reduce(
        (acc, week) => {
          acc[week.id] = "";
          return acc;
        },
        {} as Record<string, string>,
      ),
    };
    setItems([...items, newItem]);
  };

  const addNewWeek = () => {
    const newWeek: Week = {
      id: crypto.randomUUID(),
      weekNumber: weeks.length + 1,
      date: format(new Date(), "dd-MM-yy"),
    };

    // Add the new week to all existing items
    const updatedItems = items.map((item) => ({
      ...item,
      progress: {
        ...item.progress,
        [newWeek.id]: "",
      },
    }));

    setWeeks([...weeks, newWeek]);
    setItems(updatedItems);
  };

  const updateDescription = (itemId: string, value: string) => {
    const updatedItems = items.map((item) => {
      if (item.id === itemId) {
        return {
          ...item,
          description: value,
        };
      }
      return item;
    });
    setItems(updatedItems);
  };

  const updateProgress = (itemId: string, weekId: string, value: string) => {
    // Validate percentage input (0-100)
    if (
      value !== "" &&
      (!Number(value) || Number(value) < 0 || Number(value) > 100)
    ) {
      return;
    }

    const updatedItems = items.map((item) => {
      if (item.id === itemId) {
        return {
          ...item,
          progress: {
            ...item.progress,
            [weekId]: value ? `${value}%` : "",
          },
        };
      }
      return item;
    });
    setItems(updatedItems);
  };

  return (
    <div>
      <div className="rounded-lg rounded-b-none border border-b-0">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[20px] font-normal text-muted-foreground">
                No
              </TableHead>
              <TableHead className="font-normal text-muted-foreground">
                Description
              </TableHead>
              {weeks.map((week) => (
                <TableHead
                  key={week.id}
                  className="w-[120px] text-center font-normal"
                >
                  W{week.weekNumber}
                  <div className="text-xs font-normal text-gray-500">
                    {week.date}
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="border-r text-muted-foreground">
                  {item.no}
                </TableCell>
                <td>
                  <Input
                    value={item.description}
                    onChange={(e) => updateDescription(item.id, e.target.value)}
                    className="h-full w-full cursor-pointer border-0 bg-transparent px-3 focus-visible:ring-0 focus-visible:ring-offset-0"
                    placeholder="Add description..."
                  />
                </td>
                {weeks.map((week) => (
                  <TableCell
                    key={week.id}
                    className={`text-center ${item.progress[week.id] ? "bg-blue-100" : ""}`}
                  >
                    <Input
                      value={item.progress[week.id]?.replace("%", "")}
                      onChange={(e) =>
                        updateProgress(item.id, week.id, e.target.value)
                      }
                      className="mx-auto h-auto w-16 border-0 p-0 text-center focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Button
        onClick={addNewItem}
        variant="outline"
        className="flex h-full w-full items-center justify-start rounded-t-none font-normal text-muted-foreground hover:bg-muted/50 hover:text-muted-foreground"
      >
        <Plus className="mr-2 h-4 w-4" />
        Add new item
      </Button>
    </div>
  );
}
