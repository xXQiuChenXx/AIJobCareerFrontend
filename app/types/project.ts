export interface Project {
  project_id: string;
  user_id: string;
  project_name: string;
  project_year: number;
  description: string;
  project_url: string;
}

export interface CreateProjectDto {
  user_id: string;
  project_name: string;
  project_year: number;
  description?: string;
  project_url?: string;
}

export interface UpdateProjectDto extends CreateProjectDto {
  project_id: string;
}
