import Link from "next/link";
import {
  Bell,
  Home,
  LineChart,
  Package,
  Package2,
  ShoppingCart,
  Users,
} from "lucide-react";

import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LogoutForm } from "@/components/logout-form";

export function Sidebar() {
  return (
    <div className="hidden border-r bg-muted/40 md:block">
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
            <SidebarLink active>
              <Home className="h-4 w-4" />
              Dashboard
            </SidebarLink>
            <SidebarLink>
              <ShoppingCart className="h-4 w-4" />
              Orders
              <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">6</Badge>
            </SidebarLink>
            <SidebarLink>
              <Package className="h-4 w-4" />
              Products{" "}
            </SidebarLink>
            <SidebarLink>
              <Users className="h-4 w-4" />
              Customers
            </SidebarLink>
            <SidebarLink>
              <LineChart className="h-4 w-4" />
              Analytics
            </SidebarLink>
          </nav>
        </div>

        <div className="mt-auto p-4">
          <LogoutForm className="w-full" />
        </div>
      </div>
    </div>
  );
}

function SidebarLink({ children, active }: { children?: React.ReactNode, active?: boolean }) {
  return (
    <Link
      href="#"
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
        active && "bg-muted text-primary"
      )}
    >
      {children}
    </Link>
  );
}
