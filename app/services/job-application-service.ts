import { apiClient } from "./api-client";
import {
  type JobApplicationSubmitDto,
  type JobApplicationResponseDto,
  type JobDto,
} from "@/lib/types/job-application";

export class JobApplicationService {
  private baseUrl = "/JobApplications";

  /**
   * Submit a job application with resume upload support
   */
  async submitApplication(
    application: JobApplicationSubmitDto
  ): Promise<JobApplicationResponseDto> {
    // Create FormData for multipart/form-data submission
    const formData = new FormData();
    
    // Helper function to add complex objects with proper .NET Core model binding format
    const appendToFormData = (data: any, prefix = '') => {
      if (data === null || data === undefined) return;
      
      if (data instanceof File) {
        formData.append(prefix, data);
      } else if (Array.isArray(data)) {
        data.forEach((item, index) => {
          const newPrefix = `${prefix}[${index}]`;
          if (typeof item === 'object' && item !== null) {
            appendToFormData(item, newPrefix);
          } else {
            formData.append(newPrefix, item?.toString() ?? '');
          }
        });
      } else if (typeof data === 'object' && !(data instanceof File) && data !== null) {
        Object.entries(data).forEach(([key, value]) => {
          const newPrefix = prefix ? `${prefix}.${key}` : key;
          appendToFormData(value, newPrefix);
        });
      } else {
        formData.append(prefix, data?.toString() ?? '');
      }
    };
    
    // Process all application fields except resume
    const { resume, ...applicationData } = application;
    appendToFormData(applicationData);
    
    // Add resume file if present
    if (resume) {
      formData.append('Resume', resume);
    }

    // Submit the application using FormData
    const response = await apiClient.post<JobApplicationResponseDto>(
      this.baseUrl,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response;
  }

  /**
   * Get applications submitted by a specific user
   */
  async getUserApplications(
    userId: string
  ): Promise<JobApplicationResponseDto[]> {
    return apiClient.get<JobApplicationResponseDto[]>(
      `${this.baseUrl}/user/${userId}`
    );
  }

  /**
   * Get all applications for a specific job posting
   */
  async getJobApplications(
    jobId: number
  ): Promise<JobApplicationResponseDto[]> {
    return apiClient.get<JobApplicationResponseDto[]>(
      `${this.baseUrl}/job/${jobId}`
    );
  }

  /**
   * Get a specific job application by id
   */
  async getApplication(id: number): Promise<JobApplicationResponseDto> {
    return apiClient.get<JobApplicationResponseDto>(`${this.baseUrl}/${id}`);
  }

  /**
   * Update the status of a job application
   */
  async updateApplicationStatus(id: number, status: string): Promise<void> {
    await apiClient.put<void>(
      `${this.baseUrl}/${id}/status`,
      JSON.stringify(status)
    );
  }

  /**
   * Get job details by id
   */
  async getJobDetails(jobId: number): Promise<JobDto> {
    return apiClient.get<JobDto>(`/Jobs/${jobId}`);
  }
}

// Create and export a singleton instance
export const jobApplicationService = new JobApplicationService();
