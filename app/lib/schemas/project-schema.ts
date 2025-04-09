import * as z from "zod"

export const projectSchema = z.object({
  project_id: z.string(),
  user_id: z.string().optional(),
  project_name: z.string().min(1, { message: "Project name is required" }),
  project_year: z.coerce.number()
    .min(1900, { message: "Year must be after 1900" })
    .max(new Date().getFullYear() + 5, { message: "Year cannot be too far in the future" }),
  description: z.string().optional(),
  project_url: z.string().url({ message: "Please enter a valid URL" }).optional().or(z.literal('')),
  tags: z.array(z.string()).optional()
})

export type ProjectFormValues = z.infer<typeof projectSchema>

export const projectsFormSchema = z.object({
  projects: z.array(projectSchema)
})

export type ProjectsFormValues = z.infer<typeof projectsFormSchema>
