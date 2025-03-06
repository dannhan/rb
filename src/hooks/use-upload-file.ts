import { useState, useCallback, useMemo } from "react";
import type { UploadFilesOptions, inferEndpointInput } from "uploadthing/types";
import type { OurFileRouter } from "@/app/api/uploadthing/core";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/handle-error";
import { uploadFiles } from "@/lib/uploadthing";
import { type ClientUploadedFileData } from "uploadthing/types";

// Define clear types
export interface UploadedFile<T = unknown> extends ClientUploadedFileData<T> {}

export type UploadEndpoint = keyof OurFileRouter;

// Type for input based on endpoint
export type InputForEndpoint<T extends UploadEndpoint> = inferEndpointInput<
  OurFileRouter[T]
>;

// Check if a type is 'never'
type IsNever<T> = [T] extends [never] ? true : false;

// Generic Props
type BaseUploadFileProps = {
  withToast?: boolean;
  defaultUploadedFiles?: UploadedFile[];
  onSuccess?: (files: UploadedFile[]) => void;
  onError?: (error: Error) => void;
};

// Props for endpoints with input
type PropsWithInput<T extends UploadEndpoint> = BaseUploadFileProps & {
  input: InputForEndpoint<T>;
  headers?: UploadFilesOptions<OurFileRouter, T>["headers"];
  onUploadBegin?: UploadFilesOptions<OurFileRouter, T>["onUploadBegin"];
  onUploadProgress?: UploadFilesOptions<OurFileRouter, T>["onUploadProgress"];
  skipPolling?: UploadFilesOptions<OurFileRouter, T>["skipPolling"];
};

// Props for endpoints without input
type PropsWithoutInput<T extends UploadEndpoint> = BaseUploadFileProps & {
  input?: never;
  headers?: UploadFilesOptions<OurFileRouter, T>["headers"];
  onUploadBegin?: UploadFilesOptions<OurFileRouter, T>["onUploadBegin"];
  onUploadProgress?: UploadFilesOptions<OurFileRouter, T>["onUploadProgress"];
  skipPolling?: UploadFilesOptions<OurFileRouter, T>["skipPolling"];
};

// Complete props with conditional input requirement
export type UseUploadFileProps<T extends UploadEndpoint> =
  IsNever<InputForEndpoint<T>> extends true
    ? PropsWithoutInput<T>
    : PropsWithInput<T> & { input?: InputForEndpoint<T> | undefined };

export interface UseUploadFileReturn {
  onUpload: (files: File[]) => Promise<void>;
  uploadedFiles: UploadedFile[];
  progresses: Record<string, number>;
  isUploading: boolean;
  setUploadedFiles: React.Dispatch<React.SetStateAction<UploadedFile[]>>;
  clearUploadedFiles: () => void;
}

/**
 * Hook for handling file uploads via the UploadThing API
 * @template T - The upload endpoint type
 * @param endpoint - The UploadThing endpoint to use
 * @param options - Configuration options for the upload
 * @returns Object containing upload state and handlers
 *
 * @example
 * // For an endpoint that requires input:
 * const { onUpload } = useUploadFile("rab", {
 *   input: { projectId: "some-id" } // Required for "rab" endpoint
 * });
 *
 * @example
 * // For an endpoint that doesn't require input:
 * const { onUpload } = useUploadFile("testUpload", {});
 */
export function useUploadFile<T extends UploadEndpoint>(
  endpoint: T,
  options: UseUploadFileProps<T> = {} as UseUploadFileProps<T>, // Provide a default empty object
): UseUploadFileReturn {
  const {
    withToast = true,
    defaultUploadedFiles = [],
    input,
    onSuccess,
    onError,
    headers,
    onUploadBegin,
    onUploadProgress,
    skipPolling,
  } = options;

  // State management
  const [uploadedFiles, setUploadedFiles] =
    useState<UploadedFile[]>(defaultUploadedFiles);
  const [progresses, setProgresses] = useState<Record<string, number>>({});
  const [isUploading, setIsUploading] = useState(false);

  // Clear uploaded files
  const clearUploadedFiles = useCallback(() => {
    setUploadedFiles([]);
  }, []);

  // Handle file upload with improved error handling
  const onUpload = useCallback(
    async (files: File[]) => {
      if (!files.length) return;

      // Popping up toast if opt-in
      let target = files.length > 1 ? `${files.length} files` : `file`;
      const toastId = withToast
        ? toast.loading(`Uploading ${target}...`)
        : "toast-id";

      setIsUploading(true);

      try {
        // Create options object with correct types
        const uploadOptions: any = {
          files,
          headers,
          onUploadBegin,
          skipPolling,
        };

        // Only add input if it's defined (for endpoints that need it)
        if (input !== undefined) {
          uploadOptions.input = input;
        }

        // Add progress handler
        uploadOptions.onUploadProgress = (progressData: any) => {
          const { file, progress } = progressData;
          setProgresses((prev) => ({ ...prev, [file.name]: progress }));
          // Call the original progress callback if provided
          onUploadProgress?.(progressData);
        };

        const res = await uploadFiles(endpoint, uploadOptions);

        // Filter out rejected files
        const successfulFiles = res.filter((file) => {
          const success = file.serverData?.success ?? false;
          if (!success) {
            toast.error(`File "${file.name}" was rejected`);
          }
          return success;
        });

        // Update state only with successful files
        if (successfulFiles.length > 0) {
          // Change toast state
          target =
            successfulFiles.length > 1
              ? `${successfulFiles.length} files`
              : `file`;
          withToast && toast.success(`${target} uploaded`, { id: toastId });

          const newUploadedFiles = [...uploadedFiles, ...successfulFiles];
          setUploadedFiles(newUploadedFiles);
          onSuccess?.(successfulFiles);
        } else {
          toast.dismiss(toastId);
        }
      } catch (err) {
        const error =
          err instanceof Error ? err : new Error(getErrorMessage(err));
        toast.error(getErrorMessage(error), { id: toastId });
        onError?.(error);
      } finally {
        setProgresses({});
        setIsUploading(false);
      }
    },
    [
      endpoint,
      headers,
      onUploadBegin,
      onUploadProgress,
      skipPolling,
      input,
      onSuccess,
      onError,
      uploadedFiles,
    ],
  );

  // Return memoized result to prevent unnecessary re-renders
  return useMemo(
    () => ({
      onUpload,
      uploadedFiles,
      progresses,
      isUploading,
      setUploadedFiles,
      clearUploadedFiles,
    }),
    [onUpload, uploadedFiles, progresses, isUploading, clearUploadedFiles],
  );
}
