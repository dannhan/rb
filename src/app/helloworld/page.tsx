"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ProgressTable() {
  const weeks = [
    { week: "W11", physical: 30, cost: 30 },
    { week: "W12", physical: 30, cost: 30 },
    { week: "W13", physical: 35, cost: 35 },
    { week: "W14", physical: 55, cost: 45 },
    { week: "W15", physical: 60, cost: 50 },
    { week: "W16", physical: 65, cost: 55 },
    { week: "W17", physical: 70, cost: 60 },
    { week: "W18", physical: 75, cost: 65 },
  ];

  const [startIndex, setStartIndex] = useState(Math.max(weeks.length - 4, 0));
  const tableRef = useRef<HTMLDivElement>(null);

  const canGoBack = startIndex > 0;
  const canGoForward = startIndex < weeks.length - 4;

  const handlePrevious = () => {
    if (canGoBack) {
      setStartIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleNext = () => {
    if (canGoForward) {
      setStartIndex((prevIndex) => prevIndex + 1);
    }
  };

  useEffect(() => {
    if (tableRef.current) {
      tableRef.current.style.transition = "transform 0.3s ease-in-out";
      tableRef.current.style.transform = `translateX(-${startIndex * 150}px)`;
    }
  }, [startIndex]);

  return (
    <div className="mx-auto max-w-[750px] space-y-4">
      <Card>
        <CardContent className="relative p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="sticky left-0 z-20 w-[150px] bg-muted/50">
                  Minggu Ke
                </TableHead>
                <TableHead className="w-[600px] p-0" colSpan={4}>
                  <div className="relative">
                    <div className="overflow-hidden" style={{ width: "600px" }}>
                      <div
                        ref={tableRef}
                        className="flex"
                        style={{ width: `${weeks.length * 150}px` }}
                      >
                        {weeks.map((week) => (
                          <div key={week.week} className="w-[150px] shrink-0">
                            <div className="bg-muted/50 p-2 text-center">
                              {week.week}
                              <div className="text-xs text-muted-foreground">
                                TGL
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    {canGoBack && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute left-0 top-1/2 h-full -translate-y-1/2"
                        onClick={handlePrevious}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                    )}
                    {canGoForward && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-1/2 h-full -translate-y-1/2"
                        onClick={handleNext}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="sticky left-0 z-10 bg-muted/30 font-medium">
                  Progress Fisik
                </TableCell>
                <TableCell className="p-0" colSpan={4}>
                  <div className="overflow-hidden" style={{ width: "600px" }}>
                    <div
                      className="flex"
                      style={{
                        width: `${weeks.length * 150}px`,
                        transform: `translateX(-${startIndex * 150}px)`,
                        transition: "transform 0.3s ease-in-out",
                      }}
                    >
                      {weeks.map((week) => (
                        <div key={week.week} className="w-[150px] shrink-0">
                          <div className="p-2 text-center">
                            <span className="font-medium">
                              {week.physical}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="">Progress Biaya</TableCell>
                <TableCell className="p-0" colSpan={4}>
                  <div className="overflow-hidden" style={{ width: "600px" }}>
                    <div
                      className="flex"
                      style={{
                        width: `${weeks.length * 150}px`,
                        transform: `translateX(-${startIndex * 150}px)`,
                        transition: "transform 0.3s ease-in-out",
                      }}
                    >
                      {weeks.map((week) => (
                        <div key={week.week} className="w-[150px] shrink-0">
                          <div className="p-2 text-center">
                            <span className="font-medium">{week.cost}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <div className="text-center text-sm text-muted-foreground">
        Showing weeks {startIndex + 1} -{" "}
        {Math.min(startIndex + 4, weeks.length)} of {weeks.length}
      </div>
    </div>
  );
}
