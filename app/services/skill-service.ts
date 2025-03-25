import type { Skill } from "../types/skill";
import { apiClient } from "./api-client";

export const SkillService = {
  async getAllSkills(): Promise<Skill[]> {
    return apiClient.get<Skill[]>("/api/Skill");
  },

  async getSkillsByUserId(userId: string): Promise<Skill[]> {
    return apiClient.get<Skill[]>(`/api/Skill/user/${userId}`);
  },

  async createSkill(
    userId: string,
    skillName: string,
    skillLevel: string
  ): Promise<Skill> {
    return apiClient.post<Skill>("/api/Skill", {
      user_id: userId,
      skill_name: skillName,
      skill_level: skillLevel,
    });
  },

  async updateSkill(skillId: number, skillLevel: string): Promise<void> {
    return apiClient.put<void>(`/api/Skill/${skillId}`, {
      skill_id: skillId,
      skill_level: skillLevel,
    });
  },

  async deleteSkill(skillId: number): Promise<void> {
    return apiClient.delete<void>(`/api/Skill/${skillId}`);
  },
};
