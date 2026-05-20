import { api } from "../utils/api";
import type {
  ApiDto,
  AcademyScheduleResponse,
  AcademyScheduleUpdateRequest,
  DailyScheduleResponse,
} from "./types";

export const scheduleService = {
  /** 학원 전체 일정 조회 */
  async getSchedules(academyId: number) {
    return api.get<ApiDto<AcademyScheduleResponse[]>>(
      `/api/v1/academies/${academyId}/schedules`,
    );
  },

  /** 학원 일정 수정 */
  async updateSchedules(
    academyId: number,
    schedules: AcademyScheduleUpdateRequest[],
  ) {
    return api.put<ApiDto<object>>(
      `/api/v1/academies/${academyId}/schedules`,
      schedules,
    );
  },

  /** 특정 날짜 일정 및 예약 현황 조회 (yyyyMMdd 형식) */
  async getDailySchedule(academyId: number, searchDay: string) {
    return api.get<ApiDto<DailyScheduleResponse>>(
      `/api/v1/academies/${academyId}/schedules/date/${searchDay}`,
    );
  },
};
