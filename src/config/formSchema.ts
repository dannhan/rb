import { z } from "zod";

export const createProjectFormSchema = z.object({
  title: z.string().min(1, "Project name is required.").trim(),
  type: z.string().min(3, "Please select a type.").trim(),
});

export const addIdentityFormSchema = z.object({
  field: z.string().min(0, "Required").trim(),
  value: z.string().min(0, "Required").trim(),
});

export const addTeamMemberFormSchema = z.object({
  pekerjaan: z.string().min(0, "Required").trim(),
  spk: z.string().min(0, "Required".trim()),
  pelaksana: z.string().min(0, "Required".trim()),
  // TODO: might add file schema here
});

export const createDesignImageSubcategoryFormSchema = z.object({
  title: z.string().min(1, "Required").trim(),
});

export const addProgressWeekFormSchema = z.object({
  weekNumber: z.coerce.number(),
  date: z.string().min(0, " Required").trim(),
});

export const createProjectLocationFormSchema = z.object({
  detailAddress: z.string(),
  link: z
    .string()
    .url({ message: "Please enter a valid URL." })
    .or(z.string().min(0).max(0)),
  image: z.instanceof(File, { message: "File is required" }).optional(),
});

export const updateProjectTitleFormSchema = createProjectFormSchema.omit({
  type: true,
});

export const updateTeamMemberFormSchema = addTeamMemberFormSchema;

export const updateIdentityFormSchema = addIdentityFormSchema;
