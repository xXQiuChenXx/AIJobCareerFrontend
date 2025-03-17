import z from 'zod'

export const job_application_table = z.object({
  TABLE_ID: z.number(),
  TABLE_APPLICATION_ID: z.number(),
  TABLE_RESUME_ID: z.number(),
  TABLE_COVER_LETTER: z.string(),
})

export type jobApplicationTableType = z.infer<typeof job_application_table>
