"use client";

import { usePathname } from "next/navigation";
import { Toaster } from "@/components/ui/sonner";

const routeWithExpandedToast = [
  "gambar-desain",
  "jadwal-proyek",
  "realisas-biaya",
];

export function ToastProvider() {
  const pathname = usePathname();
  const lastSegment = pathname?.split("/").pop() || "";
  const expand = routeWithExpandedToast.includes(lastSegment);

  return <Toaster expand={expand} richColors closeButton visibleToasts={6} />;
}
