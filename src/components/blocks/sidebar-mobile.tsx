import Link from "next/link";
import {
  Home,
  LineChart,
  Menu,
  Package,
  Package2,
  ShoppingCart,
  Users,
} from "lucide-react";

import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { LogoutForm } from "@/components/logout-form";

export function SidebarMobile() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0 md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col">
        <nav className="grid gap-2 text-lg font-medium">
          <Link
            href="#"
            className="flex items-center gap-2 text-lg font-semibold"
          >
            <Package2 className="h-6 w-6" />
            <span className="sr-only">Acme Inc</span>
          </Link>
          <SidebarMobileLink active>
            <Home className="h-5 w-5" />
            Dashboard
          </SidebarMobileLink>
          <SidebarMobileLink>
            <ShoppingCart className="h-5 w-5" />
            Orders
            <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
              6
            </Badge>
          </SidebarMobileLink>
          <SidebarMobileLink>
            <Package className="h-5 w-5" />
            Products
          </SidebarMobileLink>
          <SidebarMobileLink>
            <Users className="h-5 w-5" />
            Customers
          </SidebarMobileLink>
          <SidebarMobileLink>
            <LineChart className="h-5 w-5" />
            Analytics
          </SidebarMobileLink>
        </nav>

        <div className="mt-auto">
          <LogoutForm className="w-full" />
        </div>
      </SheetContent>
    </Sheet>
  );
}

function SidebarMobileLink({ children, active }: { children?: React.ReactNode, active?: boolean }) {
  return (
    <Link
      href="#"
      className={cn(
        "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground",
        active && "bg-muted text-foreground"
      )}
    >
      {children}
    </Link>
  );
}
