import Logo from "@/components/Common/Logo";

type Props = { title: string };

const DocumentHeader: React.FC<Props> = ({ title }) => {
  return (
    <div className="relative flex w-full items-center">
      <Logo className="h-[130px] w-[130px]" />
      <h1 className="absolute left-1/2 -translate-x-1/2 transform text-2xl font-bold">
        {title}
      </h1>
    </div>
  );
};

export default DocumentHeader;
