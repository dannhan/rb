"use client";

import {
  ChevronDownIcon,
  XIcon,
  ImageIcon,
  CheckIcon,
  LoaderCircleIcon,
} from "lucide-react";
import { toast } from "sonner";
import AnimatedCircularProgressBar from "./ui/animated-circular-progress-bar";

// todos
// 1. better circular progress

export function FileUploaderToast({
  id,
  files,
  progresses,
  isUploading,
}: {
  id?: string | number;
  files: File[];
  progresses?: Record<string, number>;
  isUploading?: boolean;
}) {
  return (
    <>
      <div className="w-[356px] rounded-lg border-2 transition-all">
        <div className="flex items-center justify-between bg-accent/40 px-4 py-3.5">
          {isUploading ? (
            <span className="font-medium">Uploading {files.length} files.</span>
          ) : (
            <span className="font-medium">
              {files.length} uploads completed.
            </span>
          )}
          <span className="flex gap-3">
            <ChevronDownIcon className="h-5 w-5 cursor-pointer" />
            <XIcon
              className="h-5 w-5 cursor-pointer"
              onClick={() => toast.dismiss(id)}
            />
          </span>
        </div>
        <ul>
          {files.map((item, index) => (
            <li
              key={index}
              className="flex h-[51px] items-center justify-between px-4 hover:bg-muted"
            >
              <div className="flex items-center">
                <ImageIcon className="mr-2 h-4 w-4 text-red-500" />
                <span className="line-clamp-1  w-4/5 max-w-full overflow-hidden overflow-ellipsis text-sm">
                  {item.name}
                </span>
              </div>
              {!isUploading || progresses?.[item.name] === 100 ? (
                <div className="h-wit w-fit rounded-full bg-green-700 p-0.5">
                  <CheckIcon
                    className="h-4 w-4 text-white"
                    strokeWidth={3.123}
                  />
                </div>
              ) : (
                <>
                  {/* <div className="h-wit w-fit rounded-full p-0.5"> */}
                  {/*   <LoaderCircleIcon className="h-4 w-4 animate-spin text-white" /> */}
                  {/* </div> */}

                  <AnimatedCircularProgressBar
                    min={0}
                    max={100}
                    value={progresses?.[item.name] || 0}
                    gaugePrimaryColor="#4D7C0F"
                    gaugeSecondaryColor="rgba(0, 0, 0, 0.1)"
                    className="h-5 w-5"
                  />
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export const customToast = ({
  id,
  files,
  progresses = {},
  duration = Infinity,
  isUploading = true,
}: {
  id: string | number;
  files: File[];
  progresses?: Record<string, number>;
  duration?: number;
  isUploading?: boolean;
}) =>
  toast.custom(
    () => (
      <FileUploaderToast
        files={files}
        progresses={progresses}
        isUploading={isUploading}
      />
    ),
    {
      id,
      duration,
      classNames: { toast: "rounded-lg" },
    },
  );
