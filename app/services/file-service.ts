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

  getFileUrl(fileKey: string, folderName?: string): string {
    const baseUrl = import.meta.env.CLOUDFLARE_BASE_URL;
    if (folderName) {
      return `${baseUrl}/${folderName}/${fileKey}`;
    }
    return `${baseUrl}/${fileKey}`;
  },

  async deleteFile(fileKey: string): Promise<FileDeleteResponse> {
    return apiClient.delete<FileDeleteResponse>(`/Files/${fileKey}`);
  },
};
