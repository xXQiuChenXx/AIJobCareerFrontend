import { type JobFilterParams, type PaginatedResponse } from "@/types/job";
import { type jobType } from "@/models/job";
import { apiClient } from "./api-client";
import { toast } from "sonner";

export async function getJobs(
  filters: JobFilterParams
): Promise<PaginatedResponse<jobType>> {
  // Create URL with query parameters
  const queryParams = new URLSearchParams();

  // Add query parameters based on filters
  if (filters.searchTerm) {
    queryParams.append("SearchTerm", filters.searchTerm);
  }

  // Handle JobType filter - support multiple values
  if (filters.jobType !== undefined) {
    if (Array.isArray(filters.jobType)) {
      // Add each job type as a separate parameter value
      filters.jobType.forEach((jobType) => {
        queryParams.append("JobType", jobType.toString());
      });
    } else {
      queryParams.append("JobType", filters.jobType.toString());
    }
  }

  if (filters.location) {
    queryParams.append("Location", filters.location);
  }

  if (filters.minSalary) {
    queryParams.append("MinSalary", filters.minSalary.toString());
  }
  if (filters.maxSalary) {
    queryParams.append("MaxSalary", filters.maxSalary.toString());
  }

  if (filters.sortBy) {
    queryParams.append("SortBy", filters.sortBy);
  }

  if (filters.sortDescending !== undefined) {
    queryParams.append(
      "SortDescending",
      filters.sortDescending.toString()
    );
  }

  // Pagination
  if (filters.pageIndex) {
    queryParams.append("PageIndex", filters.pageIndex.toString());
  }

  if (filters.pageSize) {
    queryParams.append("PageSize", filters.pageSize.toString());
  }

  try {
    return await apiClient.get<PaginatedResponse<jobType>>(`/Jobs?${queryParams.toString()}`);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    toast("Failed to load jobs", {
      description: error instanceof Error ? error.message : "An unexpected error occurred",
    });
    throw error;
  }
}

export async function getJobById(jobId: string): Promise<jobType> {
  try {
    return await apiClient.get<jobType>(`/Jobs/${jobId}`);
  } catch (error) {
    console.error("Error fetching job details:", error);
    toast("Failed to load job details", {
      description: error instanceof Error ? error.message : "An unexpected error occurred",
    });
    throw error;
  }
}

// Function to format salary range for display
export function formatSalaryRange(
  minSalary?: number,
  maxSalary?: number
): string {
  if (!minSalary && !maxSalary) return "Not specified";

  if (minSalary && maxSalary) {
    return `RM ${formatCurrency(minSalary)} - RM ${formatCurrency(maxSalary)}`;
  } else if (minSalary) {
    return `RM ${formatCurrency(minSalary)}+`;
  } else if (maxSalary) {
    return `Up to RM ${formatCurrency(maxSalary)}`;
  }

  return "Not specified";
}

// Helper to format currency values
function formatCurrency(value: number): string {
  return value >= 1000 ? `${(value / 1000).toFixed(1)}k` : value.toString();
}

// Function to extract salary range from filter string
export function parseSalaryRange(rangeString: string): {
  min?: number;
  max?: number;
} {
  if (rangeString === "1700-2500") return { min: 1700, max: 2500 };
  if (rangeString === "2500-4000") return { min: 2500, max: 4000 };
  if (rangeString === "4000-6000") return { min: 4000, max: 6000 };
  if (rangeString === "6000+") return { min: 6000 };
  return {};
}
