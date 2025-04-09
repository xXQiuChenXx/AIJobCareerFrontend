export enum ApplicationStatus {
  New = "New",
  InReview = "InReview",
  Interview = "Interview",
  Offered = "Offered",
  Rejected = "Rejected",
  Accepted = "Accepted",
  Withdrawn = "Withdrawn"
}

export enum JobType {
  FullTime = "FullTime",
  PartTime = "PartTime",
  Contract = "Contract",
  Temporary = "Temporary",
  Internship = "Internship",
  Freelance = "Freelance"
}

// Company interface to match the API response
export interface Company {
  company_id: number;
  company_name: string;
  company_icon?: string;
  company_intro?: string;
  company_website?: string;
  company_industry?: string;
}

export interface JobApplicationSubmitDto {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  linkedIn?: string;
  portfolio?: string;
  experience: string;
  education: string;
  skills: string;
  availability: string;
  relocate: boolean;
  salary: string;
  coverLetter: string;
  termsAccepted: boolean;
  jobId: number;
  resume?: File;
}

export interface JobDto {
  id: number;
  title: string;
  company: Company; // Update to use the Company interface
  job_location: string;
  employmentType: JobType;
  job_description?: string;
  requirements?: string[];
  responsibilities?: string[];
  posted_date?: string;
  salary?: string;
  companyLogo?: string;
}

export interface JobApplicationResponseDto {
  id: number;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  linkedIn?: string;
  portfolio?: string;
  experience: string;
  education: string;
  skills: string;
  availability: string;
  relocate: boolean;
  salary: string;
  coverLetter: string;
  hasResume: boolean;
  status: string;
  submittedDate: string;
  jobPosition: JobDto;
}
