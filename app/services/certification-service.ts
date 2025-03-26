import { 
  type Certification, 
  type CreateCertificationDto, 
  type UpdateCertificationDto 
} from '../types/certification';
import { apiClient } from './api-client';

export const CertificationService = {
  async getAllCertifications(): Promise<Certification[]> {
    return apiClient.get<Certification[]>('/Certification');
  },

  async getCertificationById(id: string): Promise<Certification> {
    return apiClient.get<Certification>(`/Certification/${id}`);
  },

  async getCertificationsByUserId(userId: string): Promise<Certification[]> {
    return apiClient.get<Certification[]>(`/Certification/user/${userId}`);
  },

  async createCertification(data: CreateCertificationDto): Promise<Certification> {
    return apiClient.post<Certification>('/Certification', data);
  },

  async updateCertification(id: string, data: UpdateCertificationDto): Promise<void> {
    return apiClient.put<void>(`/Certification/${id}`, data);
  },

  async deleteCertification(id: string): Promise<void> {
    return apiClient.delete<void>(`/Certification/${id}`);
  },
};
