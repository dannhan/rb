import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { cn } from "@/lib/utils/cn";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

import AppSidebar from "./AppSidebar";
import SiteHeader from "./SiteHeader";

type Props = React.PropsWithChildren<{ projectTitle: string }>;
const DashboardLayout: React.FC<Props> = ({ projectTitle, children }) => {
  return (
    <SidebarProvider className="max-h-screen overflow-hidden">
      <AppSidebar variant="inset" />
      <SidebarInset
        className={cn(
          "overflow-hidden border shadow-none md:!shadow-sm md:peer-data-[variant=inset]:m-0 md:peer-data-[variant=inset]:rounded-none",
          "md:peer-data-[variant=inset]:mt-3 md:peer-data-[variant=inset]:rounded-tl-2xl",
          "transition-all md:peer-data-[state=collapsed]:peer-data-[variant=inset]:mx-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:mt-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:rounded-t-xl",
        )}
      >
        <SiteHeader projectTitle={projectTitle} />
        <div className="flex h-screen w-full overflow-auto p-4">
          <MaxWidthWrapper>{children}</MaxWidthWrapper>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};
export default DashboardLayout;
