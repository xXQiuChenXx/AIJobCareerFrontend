import type {
  Project,
  CreateProjectDto,
  UpdateProjectDto,
} from "../types/project";
import { apiClient } from "./api-client";

export const ProjectService = {
  async getAllProjects(): Promise<Project[]> {
    const projects = await apiClient.get<Project[]>("/Project");
    return projects.map(processProjectResponse);
  },

  async getProjectById(id: string): Promise<Project> {
    const project = await apiClient.get<Project>(`/Project/${id}`);
    return processProjectResponse(project);
  },

  async getProjectsByUserId(userId: string): Promise<Project[]> {
    const projects = await apiClient.get<Project[]>(`/Project/user/${userId}`);
    return projects.map(processProjectResponse);
  },

  async createProject(projectData: CreateProjectDto): Promise<Project> {
    // Map to backend format (camelCase)
    const requestData = {
      projectName: projectData.project_name,
      projectYear: projectData.project_year,
      description: projectData.description,
      projectUrl: projectData.project_url,
    };

    const project = await apiClient.post<Project>("/Project", requestData);

    // Add tags handling code here when backend supports it

    return processProjectResponse(project);
  },

  async updateProject(
    id: string,
    projectData: UpdateProjectDto
  ): Promise<void> {
    // Map to backend format (camelCase)
    const requestData = {
      projectName: projectData.project_name,
      projectYear: projectData.project_year,
      description: projectData.description,
      projectUrl: projectData.project_url,
    };

    await apiClient.put<void>(`/Project/${id}`, requestData);

    // Add tags handling code here when backend supports it
  },

  async deleteProject(id: string): Promise<void> {
    return apiClient.delete<void>(`/Project/${id}`);
  },
};

// Helper function to convert backend response format to frontend format
function processProjectResponse(project: any): Project {
  return {
    project_id: project.projectId || project.project_id,
    user_id: project.userId || project.user_id,
    project_name: project.projectName || project.project_name,
    project_year: project.projectYear || project.project_year,
    description: project.description,
    project_url: project.projectUrl || project.project_url,
  };
}
