export interface Education {
  education_id: string;
  user_id: string;
  degree_name: string;
  institution_name: string;
  start_year: number;
  end_year?: number;
  description: string;
  created_at?: string;
  updated_at?: string;
}

export interface CreateEducationDto {
  user_id: string;
  degree_name: string;
  institution_name: string;
  start_year: number;
  end_year?: number;
  description: string;
}

export interface UpdateEducationDto extends CreateEducationDto {
  education_id: string;
}
