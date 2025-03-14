"use client";

import { FolderPlus, Inbox } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Props = {
  className?: string;
  title?: string;
  description?: string;
  form?: React.ReactNode;
};

// WARN:
// TODO: improve this to also handle for manager
const EmptyData: React.FC<Props> = ({
  className,
  title = "No data available",
  description = "You don't have any data yet. Start by creating your first item.",
  form,
}) => {
  return (
    <Card className={cn("w-full", className)}>
      <CardHeader className="flex flex-col items-center gap-1 pb-2">
        <div className="mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
          <Inbox className="h-8 w-8 text-muted-foreground" />
          {/* <FolderPlus className="h-8 w-8 text-muted-foreground" /> */}
        </div>
        <CardTitle className="text-lg font-normal">{title}</CardTitle>
        <CardDescription className="text-center">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center pb-2">
        <div className="h-[1px] w-full max-w-[240px] bg-border" />
      </CardContent>
      <CardFooter className="flex justify-center pt-0">
        {/* <Button onClick={onAction}>{ctaText}</Button> */}
        {form}
      </CardFooter>
    </Card>
  );
};

export default EmptyData;
