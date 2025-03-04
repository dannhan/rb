import Image from "next/image";

type Props = { title: string };

const DocumentHeader: React.FC<Props> = ({ title }) => {
  return (
    <div className="flex w-full justify-between">
      <Image width={48} height={48} src="/images/logo.png" alt="logo" />
      <h1 className="text-xl font-bold">{title}</h1>
      <div />
    </div>
  );
};

export default DocumentHeader;
