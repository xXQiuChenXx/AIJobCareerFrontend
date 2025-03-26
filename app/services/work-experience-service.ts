import type {
  WorkExperience,
  CreateWorkExperienceDto,
  UpdateWorkExperienceDto,
} from "../types/work-experience";
import { apiClient } from "./api-client";

export const WorkExperienceService = {
  async getAllWorkExperiences(): Promise<WorkExperience[]> {
    return apiClient.get<WorkExperience[]>("/WorkExperience");
  },

  async getWorkExperienceById(id: string): Promise<WorkExperience> {
    return apiClient.get<WorkExperience>(`/WorkExperience/${id}`);
  },

  async getWorkExperiencesByUserId(userId: string): Promise<WorkExperience[]> {
    return apiClient.get<WorkExperience[]>(
      `/WorkExperience/user/${userId}`
    );
  },

  async createWorkExperience(
    data: CreateWorkExperienceDto
  ): Promise<WorkExperience> {
    return apiClient.post<WorkExperience>("/WorkExperience", data);
  },

  async updateWorkExperience(
    id: string,
    data: UpdateWorkExperienceDto
  ): Promise<void> {
    return apiClient.put<void>(`/WorkExperience/${id}`, data);
  },

  async deleteWorkExperience(id: string): Promise<void> {
    return apiClient.delete<void>(`/WorkExperience/${id}`);
  },
};
