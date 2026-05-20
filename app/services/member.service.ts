import { api } from "../utils/api";
import type {
  ApiDto,
  Step1SignUpRequest,
  SignUpResponse,
  RoleSelectionRequest,
  MemberResponse,
  ParentSignupRequest,
  AcademySignupRequest,
  WithdrawResponse,
  ExistMemberResponse,
  CheckUniqueRequest,
  CheckUniqueResponse,
  SearchIdRequest,
  SearchIdResponse,
  SearchPasswordStep1Request,
  SearchPasswordStep2Request,
  PasswordResetTokenResponse,
  PasswordResetRequest,
  SearchPasswordResponse,
} from "./types";

export const memberService = {
  /** 1단계 기본 회원가입 */
  async step1SignUp(body: Step1SignUpRequest) {
    return api.post<ApiDto<SignUpResponse>>("/api/v1/members/step1", body, {
      requireAuth: false,
    });
  },

  /** 2단계 역할 선택 */
  async step2SelectRole(body: RoleSelectionRequest) {
    return api.post<ApiDto<MemberResponse>>("/api/v1/members/step2", body);
  },

  /** 보호자 회원가입 완료 */
  async parentSignUp(body: ParentSignupRequest) {
    return api.post<ApiDto<MemberResponse>>(
      "/api/v1/members/signup/parent",
      body,
    );
  },

  /** 유치원 회원가입 완료 */
  async academySignUp(body: AcademySignupRequest) {
    return api.post<ApiDto<MemberResponse>>(
      "/api/v1/members/signup/academy",
      body,
    );
  },

  /** 사용자 탈퇴 */
  async withdraw() {
    return api.post<ApiDto<WithdrawResponse>>("/api/v1/members/withdraw");
  },

  /** 아이디 중복 체크 */
  async checkIdDuplicate(memberId: string) {
    return api.post<ApiDto<ExistMemberResponse>>(
      `/api/v1/members/exist/${memberId}`,
      undefined,
      { requireAuth: false },
    );
  },

  /** 이름/전화번호 중복 체크 및 인증번호 전송 */
  async checkUnique(body: CheckUniqueRequest) {
    return api.post<ApiDto<CheckUniqueResponse>>(
      "/api/v1/members/check-unique",
      body,
      { requireAuth: false },
    );
  },

  /** 아이디 찾기 - 인증 코드 발송 */
  async sendIdSearchVerification(body: SearchIdRequest) {
    return api.post<ApiDto<object>>(
      "/api/v1/members/find-id/send-verification",
      body,
      { requireAuth: false },
    );
  },

  /** 아이디 찾기 - 아이디 조회 */
  async findId(body: SearchIdRequest) {
    return api.post<ApiDto<SearchIdResponse>>("/api/v1/members/find-id", body, {
      requireAuth: false,
    });
  },

  /** 패스워드 찾기 1단계 - 인증 코드 발송 */
  async sendPasswordSearchVerification(body: SearchPasswordStep1Request) {
    return api.post<ApiDto<object>>(
      "/api/v1/members/find-password/step1",
      body,
      { requireAuth: false },
    );
  },

  /** 패스워드 찾기 2단계 - 인증 코드 검증 및 토큰 생성 */
  async verifyPasswordSearchCode(body: SearchPasswordStep2Request) {
    return api.post<ApiDto<PasswordResetTokenResponse>>(
      "/api/v1/members/find-password/step2",
      body,
      { requireAuth: false },
    );
  },

  /** 패스워드 재설정 */
  async resetPassword(body: PasswordResetRequest) {
    return api.post<ApiDto<SearchPasswordResponse>>(
      "/api/v1/members/reset-password",
      body,
      { requireAuth: false },
    );
  },
};
