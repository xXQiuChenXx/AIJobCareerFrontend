export interface Certification {
  certification_id: string;
  user_id: string;
  certification_name: string;
  issuing_organization: string;
  issue_date: string;
  expiry_date?: string;
  credential_id: string;
  credential_url: string;
}

export interface CreateCertificationDto {
  user_id: string;
  certification_name: string;
  issuing_organization: string;
  issue_date: string;
  expiry_date?: string;
  credential_id: string;
  credential_url: string;
}

export interface UpdateCertificationDto extends CreateCertificationDto {
  certification_id: string;
}
