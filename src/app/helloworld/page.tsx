"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Calendar, ChevronDown, Edit, Trash2, Plus } from "lucide-react";
import { format } from "date-fns";

const ProgressBar = ({ value, color }) => (
  <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1">
    <div className={`h-2.5 rounded-full ${color}`} style={{ width: `${value}%` }}></div>
  </div>
);

const ProgressCard = ({ week, date, physicalProgress, costProgress, onEdit, onDelete }) => {
  const getProgressColor = (progress) => {
    if (progress < 33) return 'bg-red-500';
    if (progress < 66) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <Card className="w-full">
      <CardHeader className="p-4 flex flex-row justify-between items-center">
        <CardTitle className="text-lg font-bold">Week {week}</CardTitle>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon"><ChevronDown className="h-4 w-4" /></Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={onEdit}><Edit className="mr-2 h-4 w-4" /> Edit</DropdownMenuItem>
            <DropdownMenuItem onClick={onDelete}><Trash2 className="mr-2 h-4 w-4" /> Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex items-center mb-3 text-sm text-gray-600">
          <Calendar className="mr-2 h-4 w-4" />
          {format(new Date(date), 'dd MMM yyyy')}
        </div>
        <div className="space-y-3">
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium">Physical Progress:</span>
              <span className="text-sm font-bold">{physicalProgress}%</span>
            </div>
            <ProgressBar value={physicalProgress} color={getProgressColor(physicalProgress)} />
          </div>
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium">Cost Progress:</span>
              <span className="text-sm font-bold">{costProgress}%</span>
            </div>
            <ProgressBar value={costProgress} color={getProgressColor(costProgress)} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const ProgressTracker = () => {
  const [weeks, setWeeks] = useState([
    { id: 1, week: 11, date: '2024-03-11', physicalProgress: 30, costProgress: 29 },
    { id: 2, week: 12, date: '2024-03-18', physicalProgress: 31, costProgress: 32 },
    { id: 3, week: 13, date: '2024-03-25', physicalProgress: 36, costProgress: 33 },
    { id: 4, week: 14, date: '2024-04-01', physicalProgress: 55, costProgress: 47 },
  ]);

  const addWeek = () => {
    const lastWeek = weeks[weeks.length - 1];
    const newWeek = {
      id: lastWeek.id + 1,
      week: lastWeek.week + 1,
      date: new Date(new Date(lastWeek.date).getTime() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      physicalProgress: 0,
      costProgress: 0,
    };
    setWeeks([...weeks, newWeek]);
  };

  const editWeek = (id) => {
    // Implement edit functionality
    console.log('Edit week', id);
  };

  const deleteWeek = (id) => {
    setWeeks(weeks.filter(week => week.id !== id));
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Progress Tracker</h1>
        <Button onClick={addWeek}><Plus className="mr-2 h-4 w-4" /> Add Week</Button>
      </div>
      <Carousel className="w-full">
        <CarouselContent>
          {weeks.map((week) => (
            <CarouselItem key={week.id} className="md:basis-1/2 lg:basis-1/3 pl-4">
              <ProgressCard
                week={week.week}
                date={week.date}
                physicalProgress={week.physicalProgress}
                costProgress={week.costProgress}
                onEdit={() => editWeek(week.id)}
                onDelete={() => deleteWeek(week.id)}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default ProgressTracker;