import { api } from "../utils/api";
import type {
  ApiDto,
  EnrollPetRequest,
  EnrollmentResponse,
  EnrollmentListResponse,
} from "./types";

export const enrollmentService = {
  /** 반려동물 학원 등록 신청 */
  async enrollPet(body: EnrollPetRequest) {
    return api.post<ApiDto<EnrollmentResponse>>("/api/v1/enrollments", body);
  },

  /** 학원 등록 반려동물 목록 조회 (승인된 목록) */
  async getEnrolledPets(academyId: number) {
    return api.get<ApiDto<EnrollmentListResponse[]>>(
      `/api/v1/enrollments/${academyId}`,
    );
  },

  /** 학원 대기 반려동물 목록 조회 */
  async getWaitingPets(academyId: number) {
    return api.get<ApiDto<EnrollmentListResponse[]>>(
      `/api/v1/enrollments/${academyId}/waiting`,
    );
  },

  /** 등록 신청 승인 */
  async approveEnrollment(enrollmentId: number) {
    return api.post<ApiDto<EnrollmentResponse>>(
      `/api/v1/enrollments/${enrollmentId}/approval`,
    );
  },

  /** 등록 신청 반려 */
  async rejectEnrollment(enrollmentId: number) {
    return api.post<ApiDto<EnrollmentResponse>>(
      `/api/v1/enrollments/${enrollmentId}/reject`,
    );
  },

  /** 등록 삭제 */
  async deleteEnrollment(academyId: number, petId: number) {
    return api.delete<ApiDto<object>>(
      `/api/v1/enrollments/academy/${academyId}/pet/${petId}`,
    );
  },
};
