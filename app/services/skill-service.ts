import type { Skill, CreateSkillDTO } from "../types/skill";
import { apiClient } from "./api-client";

export const SkillService = {
  async getUserSkills(userId: string): Promise<Skill[]> {
    try {
      return await apiClient.get<Skill[]>(`/UserSkills/${userId}`);
    } catch (error) {
      console.error("Failed to fetch user skills:", error);
      return [];
    }
  },

  async createSkill(skillData: CreateSkillDTO): Promise<Skill | undefined> {
    try {
      return await apiClient.post<Skill>("/UserSkills", skillData);
    } catch (error) {
      console.error("Failed to create skill:", error);
      throw error;
    }
  },

  async updateSkill(skillId: number, skillData: CreateSkillDTO): Promise<void> {
    try {
      return await apiClient.put<void>(`/UserSkills/${skillId}`, skillData);
    } catch (error) {
      console.error(`Failed to update skill ${skillId}:`, error);
      throw error;
    }
  },

  async deleteSkill(skillId: number): Promise<void> {
    try {
      return await apiClient.delete<void>(`/UserSkills/${skillId}`);
    } catch (error) {
      console.error(`Failed to delete skill ${skillId}:`, error);
      throw error;
    }
  },
  
  // Keep this for backward compatibility during transition
  async getSkillsByUserId(userId: string): Promise<Skill[]> {
    return this.getUserSkills(userId);
  }
};
  