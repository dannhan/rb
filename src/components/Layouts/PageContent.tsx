import { cn } from "@/lib/utils/cn";

type Props = React.PropsWithChildren<{
  title?: string;
  description?: string;
  className?: string;
}>;
const PageContent: React.FC<Props> = ({
  title,
  description,
  className,
  children,
}) => {
  const hasTitle = title !== undefined;
  const hasDescription = description !== undefined;

  return (
    <div className={cn(className)}>
      <div className="flex min-w-0 items-center gap-4">
        {(hasTitle || hasDescription) && (
          <div>
            {hasTitle && (
              <div className="flex items-center gap-2 py-2">
                <h1 className="text-xl font-semibold leading-7 md:text-2xl">
                  {title}
                </h1>
              </div>
            )}
            {hasDescription && (
              <p className="mt-1 hidden text-base text-neutral-500 md:block">
                {description}
              </p>
            )}
          </div>
        )}
      </div>
      <div className="min-h-screen pt-4">{children}</div>
    </div>
  );
};
export default PageContent;
