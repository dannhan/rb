import { Cabin } from "next/font/google";

import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

const cabin = Cabin({ subsets: ["latin"] });

export function Logo() {
  return (
    <Link href="/home" className="flex flex-row items-center gap-2">
      <div className="relative -ml-1 h-12 w-8">
        <Image
          src="/logo_rb.png"
          alt="logo ria busana"
          className="object-contain"
          fill
        />
      </div>
      <h1
        className="hidden font-black text-[#004481] min-[315px]:block sm:text-xl"
        style={cabin.style}
      >
        RIA BUSANA
      </h1>
    </Link>
  );
}
