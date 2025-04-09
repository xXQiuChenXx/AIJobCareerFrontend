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
    case JobType.Freelance:
      return "Freelance";
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
    case "Freelance":
      return JobType.Freelance;
    default:
      return undefined;
  }
}

// Backend DTO interfaces
export interface CompanyDto {
  company_id: string;
  company_name: string;
  company_icon: string;
  company_intro: string;
  company_website: string;
  company_industry: string;
}

export interface JobResponseDto {
  job_id: number;
  job_title: string;
  job_description: string;
  job_responsible: string;
  job_salary_min?: number;
  job_salary_max?: number;
  job_location: string;
  job_type: JobType;
  job_status: string;
  posted_date: string;
  job_deadline?: string;
  job_benefit?: string;
  job_requirement?: string;
  company: CompanyDto;
}

export interface JobBasicDTO {
  job_id: number;
  job_title: string;
  job_description: string;
  job_type: JobType;
  job_salary_min: number;
  job_salary_max: number;
  job_location: string;
  job_posted_date: string;
}

export interface CompanyWithJobsDTO {
  company_id: string;
  company_name: string;
  company_icon: string;
  company_intro: string;
  company_website: string;
  company_founded: string;
  company_industry: string;
  company_area_name?: string;
  jobs: JobBasicDTO[];
}

export interface UpdateCompanyDTO {
  company_name: string;
  company_icon: string;
  company_intro: string;
  company_website: string;
  company_founded: string;
  company_industry: string;
  company_area_name?: string;
  company_area_id?: number;
}
