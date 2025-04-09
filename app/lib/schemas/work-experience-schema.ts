import { z } from "zod";

// Base schema for work experience fields
export const workExperienceBaseSchema = z.object({
  job_title: z.string().min(1, "Job title is required"),
  company_name: z.string().min(1, "Company name is required"),
  location: z.string().min(1, "Location is required"),
  start_date: z.string().min(1, "Start date is required"),
  is_current: z.boolean(),
  description: z.string().optional(),
  experience_skill: z.string().optional(),
});

// Schema with conditional validation for end date based on is_current
export const workExperienceSchema = workExperienceBaseSchema.extend({
  end_date: z.string().optional(),
  experience_id: z.string(),
}).refine(
  (data) => !data.is_current || !data.end_date, 
  {
    message: "End date should not be provided if currently working here",
    path: ["end_date"],
  }
).refine(
  (data) => data.is_current || data.end_date, 
  {
    message: "End date is required if not currently working here",
    path: ["end_date"],
  }
);

// Schema for create operation
export const createWorkExperienceSchema = workExperienceBaseSchema.extend({
  end_date: z.string().optional(),
  user_id: z.string().uuid("Invalid user ID"),
}).refine(
  (data) => !data.is_current || !data.end_date, 
  {
    message: "End date should not be provided if currently working here",
    path: ["end_date"],
  }
).refine(
  (data) => data.is_current || data.end_date, 
  {
    message: "End date is required if not currently working here",
    path: ["end_date"],
  }
);

export type createWorkExperienceFormValues = z.infer<typeof createWorkExperienceSchema>;

// Schema for update operation
export const updateWorkExperienceSchema = workExperienceBaseSchema.extend({
  end_date: z.string().optional(),
  user_id: z.string().uuid("Invalid user ID"),
  experience_id: z.string().uuid("Invalid experience ID"),
}).refine(
  (data) => !data.is_current || !data.end_date, 
  {
    message: "End date should not be provided if currently working here",
    path: ["end_date"],
  }
).refine(
  (data) => data.is_current || data.end_date, 
  {
    message: "End date is required if not currently working here",
    path: ["end_date"],
  }
);
export type updateWorkExperienceFormValues = z.infer<typeof updateWorkExperienceSchema>;

// Schema for form submission (multiple experiences)
export const workExperienceFormSchema = z.object({
  experiences: z.array(workExperienceSchema),
});

export type WorkExperienceFormValues = z.infer<typeof workExperienceSchema>;
export type WorkExperienceFormData = z.infer<typeof workExperienceFormSchema>;
