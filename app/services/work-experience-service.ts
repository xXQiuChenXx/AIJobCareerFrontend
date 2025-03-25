import type {
  WorkExperience,
  CreateWorkExperienceDto,
  UpdateWorkExperienceDto,
} from "../types/work-experience";
import { apiClient } from "./api-client";

export const WorkExperienceService = {
  async getAllWorkExperiences(): Promise<WorkExperience[]> {
    return apiClient.get<WorkExperience[]>("/api/WorkExperience");
  },

  async getWorkExperienceById(id: string): Promise<WorkExperience> {
    return apiClient.get<WorkExperience>(`/api/WorkExperience/${id}`);
  },

  async getWorkExperiencesByUserId(userId: string): Promise<WorkExperience[]> {
    return apiClient.get<WorkExperience[]>(
      `/api/WorkExperience/user/${userId}`
    );
  },

  async createWorkExperience(
    data: CreateWorkExperienceDto
  ): Promise<WorkExperience> {
    return apiClient.post<WorkExperience>("/api/WorkExperience", data);
  },

  async updateWorkExperience(
    id: string,
    data: UpdateWorkExperienceDto
  ): Promise<void> {
    return apiClient.put<void>(`/api/WorkExperience/${id}`, data);
  },

  async deleteWorkExperience(id: string): Promise<void> {
    return apiClient.delete<void>(`/api/WorkExperience/${id}`);
  },
};
