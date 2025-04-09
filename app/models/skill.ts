import z from 'zod'

export const skillLevel = z.enum(['beginner', 'intermediate', 'proficient', 'advanced', 'expert']);

export const skill = z.object({
  skill_id: z.number(),
  skill_name: z.string(),
  skill_level: skillLevel,
})

export const createSkillSchema = z.object({
  skill_name: z.string().min(1, "Skill name is required"),
  skill_level: skillLevel,
})

export type skillType = z.infer<typeof skill>
export type CreateSkillType = z.infer<typeof createSkillSchema>
