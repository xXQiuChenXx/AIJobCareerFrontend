import type { BasicInfo } from '../types/user';
import { apiClient } from './api-client';

export const UserService = {
  async updateBasicInfo(userId: string, data: Partial<BasicInfo>): Promise<void> {
    return apiClient.put<void>(`/api/User/${userId}`, data);
  },
  
  async updateProfileImage(userId: string, fileKey: string): Promise<void> {
    return apiClient.put<void>(`/api/User/${userId}/image`, { icon: fileKey });
  },
  
  async updatePrivacySettings(userId: string, isPrivate: boolean): Promise<void> {
    return apiClient.put<void>(`/api/User/${userId}/privacy`, {
      privacy_status: isPrivate ? 'private' : 'public'
    });
  }
};
