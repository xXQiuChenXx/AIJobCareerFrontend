import type { BasicInfo } from "../types/user";
import { apiClient } from "./api-client";

export const UserService = {
  async updateBasicInfo(data: Partial<BasicInfo>): Promise<void> {
    return apiClient.put<void>(`/Profile/Update`, {
      user_first_name: data?.first_name,
      user_last_name: data?.last_name,
      user_age: data?.age,
      user_intro: data?.intro,
      user_contact_number: data?.contact_number,
      user_email: data?.email,
      user_icon: data?.icon,
      area_name: data?.location,
    });
  },

  async updateProfileImage(userId: string, fileKey: string): Promise<void> {
    return apiClient.put<void>(`/User/${userId}/image`, { icon: fileKey });
  },

  async updatePrivacySettings(
    userId: string,
    isPrivate: boolean
  ): Promise<void> {
    return apiClient.put<void>(`/User/${userId}/privacy`, {
      privacy_status: isPrivate ? "private" : "public",
    });
  },
};
