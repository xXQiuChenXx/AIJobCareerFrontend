export interface Publication {
  publication_id: string;
  user_id: string;
  publication_title: string;
  publisher: string;
  publication_year: number;
  publication_url: string;
  description: string;
}

export interface CreatePublicationDto {
  user_id: string;
  publication_title: string;
  publisher: string;
  publication_year: number;
  publication_url: string;
  description: string;
}

export interface UpdatePublicationDto extends CreatePublicationDto {
  publication_id: string;
}
