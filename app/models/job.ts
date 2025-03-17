import z from 'zod'

export const job = z.object({
  JOB_ID: z.number(),
  JOB_COMPANY_ID: z.number(),
  JOB_TITLE: z.string(),
  JOB_RESPONSIBLE: z.string(),
  JOB_SALARY_MIN: z.string().nullable(),
  JOB_SALARY_MAX: z.string().nullable(),
  JOB_LOCATION: z.string(),
  JOB_STATUS: z.string(),
  JOB_BENEFIT: z.string(),
  JOB_REQUIREMENT: z.string(),
})

export type jobType = z.infer<typeof job>
