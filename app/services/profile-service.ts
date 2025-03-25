import { type CompleteProfile } from "../types/user";
import { apiClient } from "./api-client";

export const ProfileService = {
  async getCompleteProfile(): Promise<CompleteProfile> {
    return apiClient.post<CompleteProfile>("/Profile/Complete", {});
  },
};
