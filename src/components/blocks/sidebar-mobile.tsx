"use client";

import { useEffect, useState } from "react";
import { usePathname, useSelectedLayoutSegment } from "next/navigation";
import Link from "next/link";

import { Menu, Package, Package2, ShoppingCart } from "lucide-react";
import { SidebarItem } from "@/types";
import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { LogoutForm } from "@/components/logout-form";
import { Icons } from "@/components/icons";

export function SidebarMobile({ items }: { items?: SidebarItem[] }) {
  const segment = useSelectedLayoutSegment();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // automatically close sidebar when navigation loading is completed
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="shrink-0 md:hidden"
          onClick={() => setIsOpen(true)}
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col">
        <nav className="grid gap-2 text-lg font-medium">
          <Link
            href="/home"
            className="relative bottom-3 flex items-center gap-2 text-lg font-semibold"
          >
            {/* todo, important */}
            {/* <Package2 className="h-6 w-6" />
            <span className="sr-only">Acme Inc</span> */}

            <h1 className="text-lg font-semibold text-muted-foreground md:hidden md:text-xl">
              Ria Busana
            </h1>
          </Link>

          {items?.map((item, index) => {
            const Icon = Icons[item.icon || "arrowRight"];
            return (
              <Link
                key={index}
                href={item.href}
                className={cn(
                  "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground",
                  item.href.startsWith(`${segment}`) &&
                    "bg-muted text-foreground",
                )}
              >
                <Icon className="h-5 w-5" />
                {item.title}
              </Link>
            );
          })}

          {/* todo, important */}
          {/* <Link
            href="#"
            className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
          >
            <ShoppingCart className="h-5 w-5" />
            Orders
            <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
              6
            </Badge>
          </Link>
          <Link
            href="#"
            className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
          >
            <Package className="h-5 w-5" />
            Products
          </Link> */}
        </nav>

        <div className="mt-auto">
          <LogoutForm className="w-full" />
        </div>
      </SheetContent>
    </Sheet>
  );
}
