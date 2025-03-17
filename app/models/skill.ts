import z from 'zod'

export const skill = z.object({
  SKILL_ID: z.number(),
  SKILL_NAME: z.string(),
  SKILL_INFO: z.string(),
  SKILL_TYPE: z.string(),
  SKILL_LEVEL: z.string(),
})

export type skillType = z.infer<typeof skill>
