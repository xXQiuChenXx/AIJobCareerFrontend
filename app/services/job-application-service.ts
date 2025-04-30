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
    
    // Add all application fields to FormData
    Object.entries(application).forEach(([key, value]) => {
      // Skip resume as it will be added separately
      if (key !== 'resume' && value !== undefined) {
        // Handle arrays and objects by stringifying them
        if (typeof value === 'object' && value !== null && !(value instanceof File)) {
          formData.append(key, JSON.stringify(value));
        } else if (value !== null) {
          formData.append(key, value);
        }
      }
    });
    
    // Add resume file to FormData if present
    if (application.resume) {
      formData.append('resume', application.resume);
    }

    // Submit the application using FormData
    const response = await apiClient.post<JobApplicationResponseDto>(
      this.baseUrl,
      formData
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
