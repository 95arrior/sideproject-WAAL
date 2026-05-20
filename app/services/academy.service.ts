import { api } from "../utils/api";
import type {
  ApiDto,
  AcademyResponse,
  AcademyDetailResponse,
  AcademyUpdateRequest,
} from "./types";

export const academyService = {
  /** 학원 검색 */
  async searchAcademies(params?: { sggCode?: string[]; academyName?: string }) {
    const query = new URLSearchParams();
    if (params?.sggCode) {
      params.sggCode.forEach((code) => query.append("sggCode", code));
    }
    if (params?.academyName) {
      query.set("academyName", params.academyName);
    }
    const qs = query.toString();
    return api.get<ApiDto<AcademyResponse[]>>(
      `/api/v1/academies/search${qs ? `?${qs}` : ""}`,
    );
  },

  /** 학원 상세 조회 */
  async getAcademy(academyId: number) {
    return api.get<ApiDto<AcademyDetailResponse>>(
      `/api/v1/academies/${academyId}`,
    );
  },

  /** 학원 정보 수정 */
  async updateAcademy(academyId: number, body: AcademyUpdateRequest) {
    return api.patch<ApiDto<AcademyDetailResponse>>(
      `/api/v1/academies/${academyId}`,
      body,
    );
  },

  /** 대기 중인 반려동물 존재 여부 조회 */
  async hasWaitingPets(academyId: number) {
    return api.get<ApiDto<boolean>>(
      `/api/v1/academies/${academyId}/has-waiting-pets`,
    );
  },
};
