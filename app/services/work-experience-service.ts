import type { WorkExperience } from "@/types/work-experience";
import { apiClient } from "./api-client";
import type {
  createWorkExperienceFormValues,
  updateWorkExperienceFormValues,
} from "@/lib/schemas/work-experience-schema";

export const WorkExperienceService = {
  async getAllWorkExperiences(): Promise<WorkExperience[]> {
    const experiences = await apiClient.get<WorkExperience[]>(
      "/WorkExperience"
    );
    return experiences.map(processWorkExperienceResponse);
  },

  async getWorkExperienceById(id: string): Promise<WorkExperience> {
    return apiClient.get<WorkExperience>(`/WorkExperience/${id}`);
  },

  async getWorkExperiencesByUserId(userId: string): Promise<WorkExperience[]> {
    return apiClient.get<WorkExperience[]>(`/WorkExperience/user/${userId}`);
  },

  async createWorkExperience(
    data: createWorkExperienceFormValues
  ): Promise<WorkExperience> {
    // Convert date strings to proper format before sending to API
    const formattedData = {
      ...data,
      StartDate: new Date(data.start_date).toISOString(),
      EndDate: data.end_date ? new Date(data.end_date).toISOString() : null,
      JobTitle: data.job_title,
      CompanyName: data.company_name,
      Location: data.location,
      IsCurrent: data.is_current,
      Description: data.description,
      ExperienceSkill: data.experience_skill,
      UserId: data.user_id,
    };

    return apiClient.post<WorkExperience>("/WorkExperience", formattedData);
  },

  async updateWorkExperience(
    id: string,
    data: updateWorkExperienceFormValues
  ): Promise<void> {
    // Convert date strings to proper format before sending to API
    const formattedData = {
      ...data,
      ExperienceId: id,
      StartDate: new Date(data.start_date).toISOString(),
      EndDate: data.end_date ? new Date(data.end_date).toISOString() : null,
      JobTitle: data.job_title,
      CompanyName: data.company_name,
      Location: data.location,
      IsCurrent: data.is_current,
      Description: data.description,
      ExperienceSkill: data.experience_skill,
    };

    return apiClient.put<void>(`/WorkExperience/${id}`, formattedData);
  },

  async deleteWorkExperience(id: string): Promise<void> {
    return apiClient.delete<void>(`/WorkExperience/${id}`);
  },
};

function processWorkExperienceResponse(project: any): WorkExperience {
  return {
    company_name: project.companyName || project.company_name,
    description: project.description || project.description,
    experience_id: project.experienceId || project.experience_id,
    experience_skill: project.experienceSkill || project.experience_skill,
    is_current: project.isCurrent || project.is_current,
    job_title: project.jobTitle || project.job_title,
    location: project.location || project.location,
    start_date: project.startDate || project.start_date,
    user_id: project.userId || project.user_id,
    end_date: project.endDate || project.end_date,
  };
}
