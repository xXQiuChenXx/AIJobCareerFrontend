import { type Education, type CreateEducationDto, type UpdateEducationDto } from '../types/education';
import { apiClient } from './api-client';

export const EducationService = {
  async getAllEducations(): Promise<Education[]> {
    return apiClient.get<Education[]>('/api/Education');
  },

  async getEducationById(id: string): Promise<Education> {
    return apiClient.get<Education>(`/api/Education/${id}`);
  },

  async getEducationsByUserId(userId: string): Promise<Education[]> {
    return apiClient.get<Education[]>(`/api/Education/user/${userId}`);
  },

  async createEducation(data: CreateEducationDto): Promise<Education> {
    return apiClient.post<Education>('/api/Education', data);
  },

  async updateEducation(id: string, data: UpdateEducationDto): Promise<void> {
    return apiClient.put<void>(`/api/Education/${id}`, data);
  },

  async deleteEducation(id: string): Promise<void> {
    return apiClient.delete<void>(`/api/Education/${id}`);
  },
};
