import z from 'zod'

export const resume = z.object({
  resume_id: z.number(),
  resume_user_id: z.number(),
  resume_text: z.string(),
  resume_file: z.string(),
  resume_last_modify_time: z.string(),
})

export type resumeType = z.infer<typeof resume>
