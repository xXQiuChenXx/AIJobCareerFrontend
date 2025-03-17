import z from 'zod'

export const job = z.object({
  job_id: z.number(),
  job_company_id: z.number(),
  job_title: z.string(),
  job_responsible: z.string(),
  job_salary_min: z.string().nullable(),
  job_salary_max: z.string().nullable(),
  job_location: z.string(),
  job_status: z.string(),
  job_benefit: z.string(),
  job_requirement: z.string(),
})

export type jobType = z.infer<typeof job>
