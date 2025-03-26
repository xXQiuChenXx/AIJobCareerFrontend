import type {
  Project,
  CreateProjectDto,
  UpdateProjectDto,
} from "../types/project";
import { apiClient } from "./api-client";

export const ProjectService = {
  async getAllProjects(): Promise<Project[]> {
    return apiClient.get<Project[]>("/Project");
  },

  async getProjectById(id: string): Promise<Project> {
    return apiClient.get<Project>(`/Project/${id}`);
  },

  async getProjectsByUserId(userId: string): Promise<Project[]> {
    return apiClient.get<Project[]>(`/Project/user/${userId}`);
  },

  async createProject(data: CreateProjectDto): Promise<Project> {
    return apiClient.post<Project>("/Project", data);
  },

  async updateProject(id: string, data: UpdateProjectDto): Promise<void> {
    return apiClient.put<void>(`/Project/${id}`, data);
  },

  async deleteProject(id: string): Promise<void> {
    return apiClient.delete<void>(`/Project/${id}`);
  },
};
