"use client";

import * as React from "react";

import { ProjectProgress } from "@/types";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ProgressContent } from "@/components/progress-content";
import { ProgressForm } from "@/components/progress-form";

export const ProgressCard: React.FC = () => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [projectProgresses, setProjectProgresses] =
    React.useState<ProjectProgress[]>(data);

  return (
    <div className="min-h-screen flex-1">
      <Card className="mx-auto w-full max-w-7xl">
        <CardHeader className="mx-1 flex flex-row items-baseline justify-between sm:mx-4">
          <CardTitle className="mr-4 text-xl font-bold">
            Progress Proyek
          </CardTitle>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" /> Add Week
          </Button>
        </CardHeader>
        <CardContent className="flex flex-row gap-8">
          <Carousel className="-mt-8 w-full" opts={{ align: "end" }}>
            <CarouselContent className="pt-8">
              {projectProgresses.map((projectProgress) => (
                <CarouselItem
                  key={projectProgress.id}
                  className="sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                >
                  <div className="p-1">
                    <Card className="flex h-full flex-col justify-between">
                      <CardContent className="relative p-3">
                        {isEditing ? (
                          <ProgressForm
                            setIsEditing={setIsEditing}
                            projectProgress={projectProgress}
                          />
                        ) : (
                          <ProgressContent
                            setIsEditing={setIsEditing}
                            projectProgress={projectProgress}
                          />
                        )}
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-9" />
            <CarouselNext className="-right-9" />
          </Carousel>
        </CardContent>
      </Card>
    </div>
  );
};

const data = [
  {
    id: 1,
    week: 11,
    date: new Date("2024-03-11"),
    physicalProgress: 30,
    costProgress: 29,
  },
  {
    id: 2,
    week: 12,
    date: new Date("2024-03-18"),
    physicalProgress: 31,
    costProgress: 32,
  },
  {
    id: 3,
    week: 13,
    date: new Date("2024-03-25"),
    physicalProgress: 36,
    costProgress: 33,
  },
  {
    id: 4,
    week: 14,
    date: new Date("2024-04-01"),
    physicalProgress: 55,
    costProgress: 47,
  },
];
