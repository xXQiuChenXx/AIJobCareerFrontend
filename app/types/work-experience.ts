export interface WorkExperience {
  experience_id: string;
  user_id: string;
  job_title: string;
  company_name: string;
  location: string;
  start_date: string;
  end_date?: string;
  is_current: boolean;
  description: string;
  experience_skill: string;
}

export interface CreateWorkExperienceDto {
  user_id: string;
  job_title: string;
  company_name: string;
  location: string;
  start_date: string;
  end_date?: string;
  is_current: boolean;
  description: string;
  experience_skill: string;
}

export interface UpdateWorkExperienceDto extends CreateWorkExperienceDto {
  experience_id: string;
}
