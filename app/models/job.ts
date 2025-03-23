import { JobType } from '@/types/job'
import z from 'zod'

export const Job = z.object({
  job_id: z.number(),
  company: z.object({ company_id: z.number(), company_name: z.string() }),
  job_title: z.string(),
  job_responsible: z.string(),
  job_salary_min: z.number(),
  job_salary_max: z.number(),
  job_location: z.string(),
  job_status: z.string(),
  job_benefit: z.string(),
  job_requirement: z.string(),
  posted_Date: z.date(),
  job_type: z.nativeEnum(JobType),
  requiredSkills: z.array(z.string()),
})

export type jobType = z.infer<typeof Job>
