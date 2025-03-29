import z from 'zod'
import { skill } from './skill'

export const user_skill = z.object({
  US_ID: z.number(),
  US_USER_ID: z.string().uuid(),  // Using UUID format as backend uses Guid
  US_SKILL_ID: z.number(),
  Skill: skill.optional(),  // Add relation to the skill
})

export type userSkillType = z.infer<typeof user_skill>

// Schema for creating a user skill
export const createUserSkillSchema = z.object({
  skill_name: z.string().min(1, "Skill name is required"),
  skill_level: z.string(),
  skill_type: z.string().optional(),
  skill_info: z.string().optional(),
})

export type CreateUserSkillType = z.infer<typeof createUserSkillSchema>
