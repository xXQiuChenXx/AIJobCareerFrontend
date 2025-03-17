import z from 'zod'

export const job_application = z.object({
  application_id: z.number(),
  application_job_id: z.number(),
  application_type: z.string(),
  application_status: z.string(),
  application_submission_date: z.string(),
})

export type jobApplicationType = z.infer<typeof job_application>
