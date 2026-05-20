import { api } from "../utils/api";
import type {
  ApiDto,
  SendVerificationCodeRequest,
  SendVerificationCodeResponse,
  PhoneVerificationRequest,
  PhoneVerificationResponse,
} from "./types";

export const phoneService = {
  /** 전화번호로 인증번호 발송 */
  async sendCode(body: SendVerificationCodeRequest) {
    return api.post<ApiDto<SendVerificationCodeResponse>>(
      "/api/v1/phone-verification/send-code",
      body,
      { requireAuth: false },
    );
  },

  /** 인증번호 검증 */
  async verifyCode(body: PhoneVerificationRequest) {
    return api.post<ApiDto<PhoneVerificationResponse>>(
      "/api/v1/phone-verification/verify-code",
      body,
      { requireAuth: false },
    );
  },
};
