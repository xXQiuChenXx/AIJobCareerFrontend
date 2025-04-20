import { type Education, type CreateEducationDto, type UpdateEducationDto } from '../types/education';
import { apiClient } from './api-client';

export const EducationService = {
  async getAllEducations(): Promise<Education[]> {
    return apiClient.get<Education[]>('/Education');
  },

  async getEducationById(id: string): Promise<Education> {
    return apiClient.get<Education>(`/Education/${id}`);
  },

  async getCurrentUserEducations(): Promise<Education[]> {
    return apiClient.get<Education[]>('/Education/user');
  },
  
  async getEducationsByUserId(id: string): Promise<Education[]> {
    return apiClient.get<Education[]>(`/Education/user/${id}`);
  },

  async createEducation(data: CreateEducationDto): Promise<Education> {
    return apiClient.post<Education>('/Education', data);
  },

  async updateEducation(id: string, data: UpdateEducationDto): Promise<void> {
    return apiClient.put<void>(`/Education/${id}`, data);
  },

  async deleteEducation(id: string): Promise<void> {
    return apiClient.delete<void>(`/Education/${id}`);
  },
};
