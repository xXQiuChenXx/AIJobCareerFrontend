export interface Skill {
  skill_id: number;
  skill_name: string;
  skill_level: string;
}

export interface CreateSkillDTO {
  skill_name: string;
  skill_level: string;
}
