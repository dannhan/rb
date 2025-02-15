import Link from "next/link";
import { Open_Sans } from "next/font/google";

import { MapPinIcon } from "lucide-react";

const open_sans = Open_Sans({ subsets: ["latin"], weight: ["300"] });

const FindStoreLink: React.FC = () => {
  return (
    <Link
      href="/locations"
      className="mr-1 flex gap-1 text-base text-foreground transition-all hover:text-foreground/70 dark:hover:text-foreground/40 sm:mr-4"
    >
      <MapPinIcon className="h-[20px] text-primary" />
      <span
        className="hidden tracking-widest sm:inline"
        style={open_sans.style}
      >
        Find A Store
      </span>
    </Link>
  );
};

export default FindStoreLink;
