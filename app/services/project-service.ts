import type {
  Project,
  CreateProjectDto,
  UpdateProjectDto,
} from "../types/project";
import { apiClient } from "./api-client";

export const ProjectService = {
  async getAllProjects(): Promise<Project[]> {
    return apiClient.get<Project[]>("/api/Project");
  },

  async getProjectById(id: string): Promise<Project> {
    return apiClient.get<Project>(`/api/Project/${id}`);
  },

  async getProjectsByUserId(userId: string): Promise<Project[]> {
    return apiClient.get<Project[]>(`/api/Project/user/${userId}`);
  },

  async createProject(data: CreateProjectDto): Promise<Project> {
    return apiClient.post<Project>("/api/Project", data);
  },

  async updateProject(id: string, data: UpdateProjectDto): Promise<void> {
    return apiClient.put<void>(`/api/Project/${id}`, data);
  },

  async deleteProject(id: string): Promise<void> {
    return apiClient.delete<void>(`/api/Project/${id}`);
  },
};
