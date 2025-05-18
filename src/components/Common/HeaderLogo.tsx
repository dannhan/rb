import { Cabin } from "next/font/google";

import Link from "next/link";
import Image from "next/image";

import { cn } from "@/lib/utils/cn";

const cabin = Cabin({ subsets: ["latin"] });

type Props = { className?: string };
const Logo: React.FC<Props> = ({ className }) => {
  return (
    <Link
      href="/home"
      className={cn("flex flex-row items-center gap-2", className)}
    >
      <Image
        src="/images/logo.png"
        alt="logo ria busana"
        className="object-contain"
        width={32}
        height={30}
      />
      <h1
        className="hidden font-black uppercase text-[#004481] min-[300px]:block sm:text-xl"
        style={cabin.style}
      >
        Ria Busana
      </h1>
    </Link>
  );
};

export default Logo;
