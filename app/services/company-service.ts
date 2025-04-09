import { apiClient } from "./api-client";
import {
  type CompanyWithJobsDTO,
  type UpdateCompanyDTO,
  type JobBasicDTO,
} from "../types/job";
import { FileService } from "./file-service";

export const CompanyService = {
  async getCompanyWithJobs(id: string): Promise<CompanyWithJobsDTO> {
    return apiClient.get<CompanyWithJobsDTO>(`/Company/${id}/jobs`);
  },

  async updateCompany(
    id: string,
    company: UpdateCompanyDTO
  ): Promise<CompanyWithJobsDTO> {
    return apiClient.put<CompanyWithJobsDTO>(`/Company/${id}`, company);
  },

  async createJob(job: any): Promise<any> {
    return apiClient.post("/Jobs", job);
  },

  async updateJob(id: number, job: any): Promise<void> {
    return apiClient.put(`/Jobs/${id}`, job);
  },

  async deleteJob(id: number): Promise<void> {
    return apiClient.delete(`/Jobs/${id}`);
  },

  async uploadCompanyLogo(file: File): Promise<string> {
    const response = await FileService.uploadFile(file, "company-logos");
    return response.fileKey;
  },

  getCompanyLogoUrl(fileKey: string): string {
    return FileService.getFileUrl(fileKey);
  },
};
