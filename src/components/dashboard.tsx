import { Sidebar } from "@/components/blocks/sidebar";
import { Header } from "@/components/blocks/header";

export function Dashboard({ children }: { children?: React.ReactNode }) {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <Sidebar />

      <div className="flex flex-col">
        <Header />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {/* old page title */}
          {/* <div className="flex items-center">
            <h1 className="text-lg font-semibold md:text-2xl">Inventory</h1>
          </div> */}

          {children}
        </main>
      </div>
    </div>
  );
}
