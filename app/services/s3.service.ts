import { api } from "../utils/api";
import { tokenManager } from "../utils/cookies";
import type { ApiDto, ImageUploadResponse, PresignedUrlResponse } from "./types";

export const s3Service = {
  /** 이미지 파일 업로드 → S3 key + presigned URL 반환 */
  async uploadImage(file: File): Promise<{
    success: boolean;
    data?: ImageUploadResponse;
    error?: string;
  }> {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const useProxy = process.env.NODE_ENV === "production";
      const baseURL = process.env.NEXT_PUBLIC_API_URL || "";
      const endpoint = "/api/v1/s3/upload";

      let response: Response;

      if (useProxy) {
        formData.append("url", endpoint);
        const accessToken = tokenManager.getAccessToken();
        response = await fetch("/api/proxy", {
          method: "POST",
          headers: accessToken
            ? { Authorization: `Bearer ${accessToken}` }
            : {},
          body: formData,
        });
      } else {
        const accessToken = tokenManager.getAccessToken();
        response = await fetch(`${baseURL}${endpoint}`, {
          method: "POST",
          headers: accessToken
            ? { Authorization: `Bearer ${accessToken}` }
            : {},
          body: formData,
        });
      }

      const result = await response.json();
      if (response.ok) {
        return { success: true, data: result.data };
      }
      return {
        success: false,
        error: result.message || "업로드에 실패했습니다.",
      };
    } catch (err) {
      return {
        success: false,
        error: err instanceof Error ? err.message : "네트워크 오류",
      };
    }
  },

  /** Presigned URL 조회 (이미지 조회용) */
  async getPresignedUrl(key: string) {
    return api.get<ApiDto<PresignedUrlResponse>>(
      `/api/v1/s3/presigned-url?key=${encodeURIComponent(key)}`,
    );
  },

  /** S3 이미지 삭제 */
  async deleteImage(s3Key: string) {
    return api.delete<ApiDto<object>>(
      `/api/v1/s3/delete?s3Key=${encodeURIComponent(s3Key)}`,
    );
  },
};
