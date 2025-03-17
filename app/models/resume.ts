import z from 'zod'

export const resume = z.object({
  RESUME_ID: z.number(),
  RESUME_USER_ID: z.number(),
  RESUME_TEXT: z.string(),
  RESUME_FILE: z.string(),
  RESUME_LAST_MODIFY_TIME: z.string(),
})

export type resumeType = z.infer<typeof resume>
