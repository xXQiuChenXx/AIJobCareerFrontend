import { type JobFilterParams, type PaginatedResponse } from "@/types/job";
import Cookies from "js-cookie";
import { type jobType } from "@/models/job";

export async function getJobs(
  filters: JobFilterParams
): Promise<PaginatedResponse<jobType>> {
  // Create URL with query parameters
  const url = new URL("/api/Jobs", window.location.origin);

  // Add query parameters based on filters
  if (filters.searchTerm) {
    url.searchParams.append("SearchTerm", filters.searchTerm);
  }

  // Handle JobType filter (could be single value or array)
  if (filters.jobType !== undefined) {
    if (Array.isArray(filters.jobType)) {
      // If array has values, use the first one (API doesn't support multiple job types)
      if (filters.jobType.length > 0) {
        url.searchParams.append("JobType", filters.jobType[0].toString());
      }
    } else {
      url.searchParams.append("JobType", filters.jobType.toString());
    }
  }

  if (filters.location) {
    url.searchParams.append("Location", filters.location);
  }

  if (filters.minSalary) {
    url.searchParams.append("MinSalary", filters.minSalary.toString());
  }

  if (filters.sortBy) {
    url.searchParams.append("SortBy", filters.sortBy);
  }

  if (filters.sortDescending !== undefined) {
    url.searchParams.append(
      "SortDescending",
      filters.sortDescending.toString()
    );
  }

  // Pagination
  if (filters.pageIndex) {
    url.searchParams.append("PageIndex", filters.pageIndex.toString());
  }

  if (filters.pageSize) {
    url.searchParams.append("PageSize", filters.pageSize.toString());
  }

  // Get token from localStorage or wherever auth token is stored
  // const token = Cookies.get("token");

  // if (!token) {
  //   throw new Error("Authentication token is missing");
  // }

  try {
    const response = await fetch(url.toString(), {
      headers: {
        // Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      // if (response.status === 401) {
      //   throw new Error("Unauthorized access. Please login again.");
      // }
      throw new Error(`Failed to fetch jobs: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching jobs:", error);
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
    return `Up to $${formatCurrency(maxSalary)}`;
  }

  return "Not specified";
}

// Helper to format currency values
function formatCurrency(value: number): string {
  return value >= 1000 ? `${(value / 1000).toFixed(0)}k` : value.toString();
}

// Function to extract salary range from filter string
export function parseSalaryRange(rangeString: string): {
  min?: number;
  max?: number;
} {
  if (rangeString === "0-50k") return { max: 50000 };
  if (rangeString === "50k-100k") return { min: 50000, max: 100000 };
  if (rangeString === "100k-150k") return { min: 100000, max: 150000 };
  if (rangeString === "150k+") return { min: 150000 };
  return {};
}
