"use client";

import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

import { Bell, Package, Package2, ShoppingCart } from "lucide-react";
import { SidebarItem } from "@/types";
import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LogoutForm } from "@/components/logout-form";
import { Icons } from "@/components/icons";

export function Sidebar({ items }: { items?: SidebarItem[] }) {
  const segment = useSelectedLayoutSegment();

  return (
    <div className="hidden w-[220px] border-r bg-muted/40 md:block lg:w-[280px]">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Package2 className="h-6 w-6" />
            <span className="">Acme Inc</span>
          </Link>
          <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {items?.map((item, index) => {
              const Icon = Icons[item.icon || "arrowRight"];
              return (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                    item.href.startsWith(`${segment}`) &&
                      "bg-muted text-primary",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.title}
                </Link>
              );
            })}

            <Link
              href="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <ShoppingCart className="h-4 w-4" />
              Orders
              <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                6
              </Badge>
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <Package className="h-4 w-4" />
              Products
            </Link>
          </nav>
        </div>

        <div className="mt-auto p-4">
          <LogoutForm className="w-full" />
        </div>
      </div>
    </div>
  );
}
