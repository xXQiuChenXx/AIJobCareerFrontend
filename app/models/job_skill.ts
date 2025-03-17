import z from 'zod'

export const job_skill = z.object({
  JS_ID: z.number(),
  JS_JOB_ID: z.number(),
  JS_SKILL_ID: z.number(),
})

export type jobSkillType = z.infer<typeof job_skill>
