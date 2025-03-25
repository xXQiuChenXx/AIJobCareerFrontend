import type { 
  Publication, 
  CreatePublicationDto, 
  UpdatePublicationDto 
} from '../types/publication';
import { apiClient } from './api-client';

export const PublicationService = {
  async getAllPublications(): Promise<Publication[]> {
    return apiClient.get<Publication[]>('/api/Publication');
  },

  async getPublicationById(id: string): Promise<Publication> {
    return apiClient.get<Publication>(`/api/Publication/${id}`);
  },

  async getPublicationsByUserId(userId: string): Promise<Publication[]> {
    return apiClient.get<Publication[]>(`/api/Publication/user/${userId}`);
  },

  async createPublication(data: CreatePublicationDto): Promise<Publication> {
    return apiClient.post<Publication>('/api/Publication', data);
  },

  async updatePublication(id: string, data: UpdatePublicationDto): Promise<void> {
    return apiClient.put<void>(`/api/Publication/${id}`, data);
  },

  async deletePublication(id: string): Promise<void> {
    return apiClient.delete<void>(`/api/Publication/${id}`);
  },
};
