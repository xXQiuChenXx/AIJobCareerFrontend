import { company_industries } from "@/sample-data/company";
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
  area: z.object({
    area_id: z.number(),
    area_name: z.string(),
  }).optional().nullable(),
});

export type Company = z.infer<typeof company>;

// Add type for company with jobs
export const jobBasic = z.object({
  job_id: z.string(),
  job_title: z.string(),
  job_description: z.string().optional(),
  job_type: z.string().optional(),
  job_salary_min: z.number().optional(),
  job_salary_max: z.number().optional(),
});

export type JobBasic = z.infer<typeof jobBasic>;

export const companyWithJobs = company.extend({
  jobs: z.array(jobBasic).optional()
});

export type CompanyWithJobs = z.infer<typeof companyWithJobs>;

export const companyCreateSchema = company.omit({ company_id: true });
export type CompanyCreate = z.infer<typeof companyCreateSchema>;

export const companyUpdateSchema = company;
export type CompanyUpdate = z.infer<typeof companyUpdateSchema>;
