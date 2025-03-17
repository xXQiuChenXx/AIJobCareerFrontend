import z from 'zod'

export const skill = z.object({
  skill_id: z.number(),
  skill_name: z.string(),
  skill_info: z.string(),
  skill_type: z.string(),
  skill_level: z.string(),
})

export type skillType = z.infer<typeof skill>
