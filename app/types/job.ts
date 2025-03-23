export enum JobType {
  Full_Time = 0,
  Part_Time = 1,
  Contract = 2,
  Internship = 3,
  Freelance = 4,
}

export interface PaginatedResponse<T> {
  items: T[];
  totalCount: number;
  pageIndex: number;
  pageSize: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface JobFilterParams {
  searchTerm?: string;
  jobType?: JobType | JobType[];
  location?: string;
  minSalary?: number;
  maxSalary?: number;
  sortBy?: string;
  sortDescending?: boolean;
  pageIndex?: number;
  pageSize?: number;
}

// Helper function to convert JobType enum values to display strings
export function jobTypeToString(jobType: JobType): string {
  switch (jobType) {
    case JobType.Full_Time:
      return "Full-time";
    case JobType.Part_Time:
      return "Part-time";
    case JobType.Contract:
      return "Contract";
    case JobType.Internship:
      return "Internship";
    default:
      return "Unknown";
  }
}

// Helper function to convert display strings to JobType enum values
export function stringToJobType(jobTypeStr: string): JobType | undefined {
  switch (jobTypeStr) {
    case "Full-time":
      return JobType.Full_Time;
    case "Part-time":
      return JobType.Part_Time;
    case "Contract":
      return JobType.Contract;
    case "Internship":
      return JobType.Internship;
    default:
      return undefined;
  }
}
