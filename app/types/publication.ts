export interface Publication {
  publication_id: string;
  user_id: string | null;
  publication_title: string;
  publisher: string;
  publication_year: number;
  publication_url: string;
  description: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface CreatePublicationDto {
  user_id: string;
  publication_title: string;
  publisher: string;
  publication_year: number;
  publication_url: string;
  description: string;
}

export interface UpdatePublicationDto {
  publication_id: string;
  publication_title: string;
  publisher: string;
  publication_year: number;
  publication_url: string;
  description: string;
}
