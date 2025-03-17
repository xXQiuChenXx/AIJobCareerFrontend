import z from 'zod'

export const user_skill = z.object({
  US_ID: z.number(),
  US_USER_ID: z.number(),
  US_SKILL_ID: z.number(),
})

export type userSkillType = z.infer<typeof user_skill>
