"use client";

import { Inbox } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Props = {
  admin: boolean;
  className?: string;
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  form?: React.ReactNode;
};

const EmptyState: React.FC<Props> = ({
  admin,
  className,
  title = "No data available",
  description = "You don't have any data yet. Start by creating your first item.",
  icon,
  form,
}) => {
  return (
    <Card className={cn("w-full", className)}>
      <CardHeader className="flex flex-col items-center gap-1 pb-2">
        <div className="mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
          {icon || <Inbox className="h-8 w-8 text-muted-foreground" />}
        </div>
        <CardTitle className="text-lg font-normal">{title}</CardTitle>
        <CardDescription className="text-center">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center pb-2">
        {admin && form && (
          <div className="h-[1px] w-full max-w-[240px] bg-border" />
        )}
      </CardContent>
      <CardFooter className="flex justify-center pt-0">
        {admin && form}
      </CardFooter>
    </Card>
  );
};

export default EmptyState;
