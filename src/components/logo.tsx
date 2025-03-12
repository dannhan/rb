import { Cabin } from "next/font/google";

import Link from "next/link";
import Image from "next/image";

import { cn } from "@/lib/utils";

const cabin = Cabin({ subsets: ["latin"] });

type Props = { className?: string };

export function Logo({ className }: Props) {
  return (
    <Link
      href="/home"
      className={cn("flex flex-row items-center gap-2", className)}
    >
      <div className="relative -ml-1 h-12 w-8">
        <Image
          src="/images/logo.png"
          alt="logo ria busana"
          className="object-contain"
          fill
        />
      </div>
      <h1
        className="hidden font-black uppercase text-[#004481] min-[300px]:block sm:text-xl"
        style={cabin.style}
      >
        Ria Busana
      </h1>
    </Link>
  );
}
