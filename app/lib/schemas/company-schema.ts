import { z } from "zod"

// Company profile schema
export const companyProfileSchema = z.object({
  company_name: z.string().min(2, {
    message: "Company name must be at least 2 characters.",
  }),
  company_intro: z.string().min(10, {
    message: "Company introduction must be at least 10 characters.",
  }),
  company_website: z.string().url({
    message: "Please enter a valid URL.",
  }),
  company_industry: z.string().min(2, {
    message: "Industry must be at least 2 characters.",
  }),
  company_area_name: z.string().min(2, {
    message: "Location must be at least 2 characters.",
  }),
  company_founded: z.date({
    required_error: "Please select a date.",
  }),
})

export type CompanyProfileFormValues = z.infer<typeof companyProfileSchema>

// Job type mapping - updated to match backend enum
export const jobTypeMap = {
  0: "Full-time",
  1: "Part-time", 
  2: "Contract",
  3: "Internship",
  4: "Freelance",
}

// Job schema
export const jobSchema = z.object({
  job_title: z.string().min(2, {
    message: "Job title must be at least 2 characters.",
  }),
  job_description: z.string().min(10, {
    message: "Job description must be at least 10 characters.",
  }),
  job_type: z.number().min(0).max(4),
  job_salary_min: z.number().min(0),
  job_salary_max: z.number().min(0),
  job_location: z.string().min(2, {
    message: "Job location must be at least 2 characters.",
  }),
})

export type JobFormValues = z.infer<typeof jobSchema>

