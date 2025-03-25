import {
  type FileUploadResponse,
  type FileDeleteResponse,
} from "../types/file";
import { apiClient } from "./api-client";

export const FileService = {
  async uploadFile(file: File, folder?: string): Promise<FileUploadResponse> {
    const formData = new FormData();
    formData.append("file", file);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      params: folder ? { folder } : undefined,
    };

    return apiClient.post<FileUploadResponse>(
      "/Files/upload",
      formData,
      config
    );
  },

  getFileUrl(fileKey: string): string {
    const baseUrl =
      process.env.NEXT_PUBLIC_API_URL || "https://api.aicareer.example.com";
    return `${baseUrl}/Files/${fileKey}`;
  },

  async deleteFile(fileKey: string): Promise<FileDeleteResponse> {
    return apiClient.delete<FileDeleteResponse>(`/Files/${fileKey}`);
  },
};
