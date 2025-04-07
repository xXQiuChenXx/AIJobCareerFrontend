export interface FileUploadResponse {
  fileKey: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
  uploadedAt: string;
}

export interface FileDeleteResponse {
  success: boolean;
  message: string;
}
