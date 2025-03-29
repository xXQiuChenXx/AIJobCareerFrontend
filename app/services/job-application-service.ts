import { apiClient } from "./api-client";
import {
  type JobApplicationSubmitDto,
  type JobApplicationResponseDto,
  type JobDto,
} from "@/lib/types/job-application";
import axios from "axios";

export class JobApplicationService {
  private baseUrl = "/JobApplications";

  /**
   * Submit a job application with resume upload support
   */
  async submitApplication(
    application: JobApplicationSubmitDto
  ): Promise<JobApplicationResponseDto> {
    // Create FormData for multipart/form-data (needed for file upload)
    const formData = new FormData();

    // Add all application fields to formData
    Object.entries(application).forEach(([key, value]) => {
      if (key === "resume" && value) {
        formData.append("resume", value);
      } else if (value !== undefined && value !== null) {
        formData.append(key, String(value));
      }
    });

    // Use axios directly for FormData with correct content type
    const response = await axios.post(`${this.baseUrl}`, formData, {
      headers: {
        // Let the browser set the content-type with boundary for FormData
        "Content-Type": "multipart/form-data",
        // Include auth token that our ApiClient would normally add
        ...(apiClient["client"].defaults.headers.common || {}),
      },
    });

    return response.data;
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
