import { apiClient } from "./api-client";
import {
  type JobApplicationSubmitDto,
  type JobApplicationResponseDto,
  type JobDto,
} from "@/lib/types/job-application";
import { FileService } from "./file-service";

export class JobApplicationService {
  private baseUrl = "/JobApplications";

  /**
   * Submit a job application with resume upload support
   */
  async submitApplication(
    application: JobApplicationSubmitDto
  ): Promise<JobApplicationResponseDto> {
    // First, handle resume upload if present
    let resumeUrl = undefined;
    if (application.resume) {
      try {
        // Upload file to "resumes" folder
        const uploadResponse = await FileService.uploadFile(application.resume, "resumes");
        // Get the URL for the uploaded file
        const fileKey = uploadResponse.fileKey;
        resumeUrl = FileService.getFileUrl(fileKey);
      } catch (error) {
        console.error("Error uploading resume:", error);
        throw new Error("Failed to upload resume");
      }
    }

    // Create data object for application submission
    const applicationData = {
      ...application,
      // Remove the File object and replace with URL if we have one
      resume: undefined,
      resumeUrl
    };

    // Submit the application
    const response = await apiClient.post<JobApplicationResponseDto>(
      this.baseUrl,
      applicationData,
      {
        headers: {
          "Content-Type": "application/json",
          ...(apiClient["client"].defaults.headers.common || {}),
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
