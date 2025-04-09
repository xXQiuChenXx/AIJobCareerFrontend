import { ALLOWED_CITIES } from "@/types/about-form-schema";
import z from "zod";

export const company = z.object({
  company_id: z.string(),
  company_name: z.string().min(1, "Company name is required"),
  company_icon: z.string().optional().nullable(),
  company_intro: z.string().optional(),
  company_website: z.string().url("Invalid URL format").optional(),
  company_area_id: z.number().nullable().optional(),
  company_industry: z.string().optional(),
  company_founded: z.string().optional(),
  company_area_name: z.enum(ALLOWED_CITIES, {
    errorMap: () => ({ message: "Please select a valid city" }),
  }),
});

export type Company = z.infer<typeof company>;

export const jobBasic = z.object({
  job_id: z.string(),
  job_title: z.string(),
  job_description: z.string().optional(),
  job_type: z.string().optional(),
  job_salary_min: z.number().optional(),
  job_salary_max: z.number().optional(),
  job_location: z.string(),
  job_posted_date: z.string()
});

export type JobBasic = z.infer<typeof jobBasic>;

export const companyWithJobs = company.extend({
  Jobs: z.array(jobBasic).optional(), // Changed from "jobs" to "Jobs" to match backend DTO
});

export type CompanyWithJobs = z.infer<typeof companyWithJobs>;

export const companyCreateSchema = company.omit({ company_id: true });
export type CompanyCreate = z.infer<typeof companyCreateSchema>;

export const companyUpdateSchema = company.partial().required({ company_id: true });
export type CompanyUpdate = z.infer<typeof companyUpdateSchema>;
