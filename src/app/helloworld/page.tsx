"use client";

// import { useState } from "react";
// import { toast, Toaster } from "sonner";
import {
  FileIcon,
  CheckCircle2,
  ImageIcon,
  XIcon,
  ChevronDownIcon,
  CheckIcon,
} from "lucide-react";

// import { ModeToggle } from "@/components/mode-toggle";
//
//
// export default function Component() {
//   const showUploadToast = () => {
//     const uploads: UploadItem[] = [
//       { name: "image4.jpg", status: "complete" },
//       // { name: "image2.jpg", status: "complete" },
//       // { name: "image3.png", status: "complete" },
//       // { name: "image6.png", status: "complete" },
//     ];
//
//     // toast.custom((t) => <CustomToast uploads={uploads} />);
//     toast.custom((t) => <div>Hello World</div>);
//   };
//
//   return (
//     <div>
//       <ModeToggle />
//       {/* <CustomToast uploads={uploads} /> */}
//       <button
//         onClick={showUploadToast}
//         className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
//       >
//         Show Upload Toast
//       </button>
//       <Toaster />
//     </div>
//   );
// }

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { nanoid } from "nanoid";
import React from "react";
import { cn } from "@/lib/utils";
import AnimatedCircularProgressBar from "@/components/ui/animated-circular-progress-bar";

interface UploadItem {
  name: string;
  status: "complete" | "pending";
}

export default function Page() {
  const uploads: UploadItem[] = [
    { name: "image4.jpg", status: "complete" },
    { name: "image2.jpg", status: "complete" },
    { name: "image3.png", status: "complete" },
    { name: "image6.png", status: "complete" },
  ];

  return (
    <div className="flex gap-4">
      <Button
        variant="default"
        onClick={async () => {
          const id = toast.loading("image2.png", {
            description: "Uploading...",
            position: "top-right",
            closeButton: false,
          });

          await new Promise((resolve) => setTimeout(resolve, 3000));

          toast.success("image2.png", {
            id,
            description: "Uploaded",
            position: "top-right",
            closeButton: true,
          });
        }}
      >
        Toast
      </Button>
      <Button
        variant="secondary"
        onClick={() =>
          toast.custom(() => (
            <div className="h-[53px] w-[356px] rounded-md border p-4 text-sm">
              <h1>Custom toast</h1>
            </div>
          ))
        }
      >
        Toast
      </Button>
      <Button
        onClick={() => {
          const id = nanoid();
          toast.custom(() => <CustomToast id={id} uploads={uploads} />, { id });
        }}
      >
        Upload Custom Arrow Toast
      </Button>
      <Button onClick={() => toast.dismiss()} variant={"destructive"}>
        Dismiss
      </Button>

      <div className="flex flex-row ">
        <div>
          <div className="h-wit w-fit rounded-full bg-green-700 p-0.5">
            <CheckIcon className="h-4 w-4 text-white" strokeWidth={3.123} />
          </div>
        </div>

        <AnimatedCircularProgressBar
          min={0}
          max={100}
          value={45}
          gaugePrimaryColor="#4D7C0F"
          gaugeSecondaryColor="rgba(0, 0, 0, 0.1)"
          className="size-20 overflow-visible"
        />
      </div>
    </div>
  );
}

const CustomToast = ({
  id,
  uploads,
}: {
  id?: string | number;
  uploads: UploadItem[];
}) => {
  return (
    <div className="w-[356px] rounded-lg border-2 transition-all">
      <div className="flex items-center justify-between bg-accent/40 px-4 py-3.5">
        <span className="font-medium">4 uploads complete</span>
        <span className="flex gap-3">
          <ChevronDownIcon className="h-5 w-5 cursor-pointer" />
          <XIcon
            className="h-5 w-5 cursor-pointer"
            onClick={() => toast.dismiss(id)}
          />
        </span>
      </div>
      <ul>
        {uploads.map((item, index) => (
          <li
            key={index}
            className="flex h-[51px] items-center justify-between px-4 hover:bg-muted"
          >
            <div className="flex items-center">
              <ImageIcon className="mr-2 h-4 w-4 text-red-500" />
              <span className="text-sm">{item.name}</span>
            </div>
            {item.status === "complete" && (
              <div className="h-wit w-fit rounded-full bg-green-700 p-0.5">
                <CheckIcon className="h-4 w-4 text-white" strokeWidth={3.123} />
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
