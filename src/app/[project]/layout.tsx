import { Dashboard } from "@/components/dashboard";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Dashboard>
      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
        <div className="flex flex-col items-center gap-1 text-center">
          {children}
        </div>
      </div>
    </Dashboard>
  );
}
