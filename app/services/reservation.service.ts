import { api } from "../utils/api";
import type {
  ApiDto,
  PetReservationRequest,
  PetReservationResponse,
  PetReservationDetailResponse,
  PetReservationAbleResponse,
  AcademyReservationSummaryResponse,
} from "./types";

export const reservationService = {
  /** 예약 생성 */
  async createReservation(body: PetReservationRequest) {
    return api.post<ApiDto<PetReservationResponse>>(
      "/api/v1/reservations",
      body,
    );
  },

  /** 예약 상세 조회 */
  async getReservation(reservationId: number) {
    return api.get<ApiDto<PetReservationDetailResponse>>(
      `/api/v1/reservations/${reservationId}`,
    );
  },

  /** 예약 취소 */
  async cancelReservation(reservationId: number) {
    return api.delete<ApiDto<void>>(`/api/v1/reservations/${reservationId}`);
  },

  /** 등원 상태 변경 (CHECK_IN / CHECK_OUT / CANCEL 등) */
  async updateReservationStatus(reservationId: number, status: string) {
    return api.patch<ApiDto<void>>(
      `/api/v1/reservations/${reservationId}/${status}`,
    );
  },

  /** 특정 날짜 반려동물 예약 여부 조회 */
  async getPetReservationByDate(petId: number, searchDate: string) {
    return api.get<ApiDto<PetReservationAbleResponse>>(
      `/api/v1/reservations/${petId}/${searchDate}`,
    );
  },

  /** 학원의 특정 날짜 예약 목록 조회 */
  async getAcademyReservations(academyId: number, date: string) {
    return api.get<ApiDto<AcademyReservationSummaryResponse>>(
      `/api/v1/reservations/academy/${academyId}?date=${date}`,
    );
  },
};
