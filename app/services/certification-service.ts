import { 
  type Certification, 
  type CreateCertificationDto, 
  type UpdateCertificationDto 
} from '../types/certification';
import { apiClient } from './api-client';

export const CertificationService = {
  async getAllCertifications(): Promise<Certification[]> {
    return apiClient.get<Certification[]>('/api/Certification');
  },

  async getCertificationById(id: string): Promise<Certification> {
    return apiClient.get<Certification>(`/api/Certification/${id}`);
  },

  async getCertificationsByUserId(userId: string): Promise<Certification[]> {
    return apiClient.get<Certification[]>(`/api/Certification/user/${userId}`);
  },

  async createCertification(data: CreateCertificationDto): Promise<Certification> {
    return apiClient.post<Certification>('/api/Certification', data);
  },

  async updateCertification(id: string, data: UpdateCertificationDto): Promise<void> {
    return apiClient.put<void>(`/api/Certification/${id}`, data);
  },

  async deleteCertification(id: string): Promise<void> {
    return apiClient.delete<void>(`/api/Certification/${id}`);
  },
};
