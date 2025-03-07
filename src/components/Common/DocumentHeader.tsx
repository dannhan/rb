import Image from "next/image";

type Props = { title: string };

const DocumentHeader: React.FC<Props> = ({ title }) => {
  return (
    <div className="relative flex w-full items-center">
      <Image
        width={130}
        height={130}
        src="/logo/RB LOGO - KONFIGURASI VERTICAL-01.png"
        alt="logo"
      />
      <h1 className="absolute left-1/2 -translate-x-1/2 transform text-2xl font-bold">
        {title}
      </h1>
    </div>
  );
};

export default DocumentHeader;
