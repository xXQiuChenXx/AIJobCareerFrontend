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
  company: string;
  location: string;
  employmentType: JobType;
  description?: string;
  requirements?: string[];
  responsibilities?: string[];
  postedDate?: string;
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
