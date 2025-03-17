import z from 'zod'

export const job_application = z.object({
  APPLICATION_ID: z.number(),
  APPLICATION_JOB_ID: z.number(),
  APPLICATION_TYPE: z.string(),
  APPLICATION_STATUS: z.string(),
  APPLICATION_SUBMISSION_DATE: z.string(),
})

export type jobApplicationType = z.infer<typeof job_application>
