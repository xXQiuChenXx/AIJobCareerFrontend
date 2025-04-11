import { type CompleteProfile } from "../types/user";
import { apiClient } from "./api-client";

export const ProfileService = {
  async getCompleteProfile(id: string): Promise<CompleteProfile> {
    return apiClient.post<CompleteProfile>(`/Profile/Complete/${id}`, {});
  },
};
