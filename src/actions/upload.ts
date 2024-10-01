"use server";

import { UTApi } from "uploadthing/server";

const utapi = new UTApi();

export async function uploadFiles(formData: FormData) {
  const files = formData.getAll("file") as File[];

  if (files.length === 0) {
    throw new Error("No files provided");
  }

  try {
    const response = await utapi.uploadFiles(files);
    return response;
  } catch (error) {
    console.error("Error uploading files:", error);
    throw error;
  }
}
