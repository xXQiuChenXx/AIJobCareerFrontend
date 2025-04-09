import { JobType } from '@/types/job'
import z from 'zod'
import { company } from './company'

export const Job = z.object({
  job_id: z.number(),
  company: company,
  job_title: z.string(),
  job_description: z.string(),
  job_responsible: z.string(),
  job_salary_min: z.number(),
  job_salary_max: z.number(),
  job_location: z.string(),
  job_deadline: z.date(),
  job_status: z.string(),
  job_benefit: z.string(),
  job_requirement: z.string(),
  posted_date: z.date(),
  job_type: z.nativeEnum(JobType),
  requiredSkills: z.array(z.string()),
})

export type jobType = z.infer<typeof Job>
