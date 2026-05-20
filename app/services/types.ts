// ─── 공통 응답 래퍼 ───────────────────────────────────────────────────────────

export interface ApiDto<T> {
  code: number;
  data: T;
}

// ─── 인증 ─────────────────────────────────────────────────────────────────────

export interface LoginRequest {
  memberId: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  id: number;
  memberId: string;
  email: string;
  name: string;
  role: string;
  academyId: number | null;
  memberPhone: string;
  academyName: string | null;
  academyAdmin: boolean;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}

// ─── 회원 ─────────────────────────────────────────────────────────────────────

export interface Step1SignUpRequest {
  memberId: string;
  memberPassword: string;
  memberPhone: string;
  memberName: string;
  memberEmail: string;
  agreeTerms: boolean;
  agreePrivacy: boolean;
  agreeMarketing: boolean;
}

export interface SignUpResponse {
  id: number;
  memberId: string;
  name: string;
  role: string;
  academyId: number | null;
  academyAdmin: boolean;
}

export interface RoleSelectionRequest {
  role: "ACADEMY" | "PARENT";
}

export interface MemberResponse {
  id: number;
  memberId: string;
  email: string;
  name: string;
  phone: string;
  role: string;
  academyAdmin: boolean;
}

export interface ParentSignupRequest {
  name: string;
  breed: string;
  birthday: string;
  gender: "MALE" | "FEMALE";
  academyId: number;
  startDate?: string;
  endDate?: string;
  imageKey?: string;
}

export interface AcademyScheduleRequest {
  dayOfWeek: "MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT" | "SUN";
  isOpen: boolean;
  operatingStartTime: string;
  operatingEndTime: string;
}

export interface AcademySignupRequest {
  academyName: string;
  academyAddress: string;
  academyAddressDetail?: string;
  sggCode: string;
  academyPhone: string;
  maxCapacity: number;
  imageKey?: string;
  scheduleList?: AcademyScheduleRequest[];
}

export interface CheckUniqueRequest {
  name?: string;
  email?: string;
  phone?: string;
}

export interface CheckUniqueResponse {
  uniqueCheck: boolean;
  success: boolean;
  expiresIn: number;
  verificationCode?: string;
}

export interface ExistMemberResponse {
  existMember: boolean;
}

export interface WithdrawResponse {
  success: boolean;
  message: string;
}

export interface SearchIdRequest {
  verfiyType: "email" | "phone";
  name?: string;
  email?: string;
  phone?: string;
  verificationCode?: string;
}

export interface SearchIdResponse {
  memberId: string;
  memberName: string;
}

export interface SearchPasswordStep1Request {
  verfiyType: "email" | "phone";
  memberId: string;
  email?: string;
  phone?: string;
}

export interface SearchPasswordStep2Request {
  verfiyType: "email" | "phone";
  memberId: string;
  email?: string;
  phone?: string;
  verificationCode: string;
}

export interface PasswordResetTokenResponse {
  resetToken: string;
  expiresInSeconds: number;
}

export interface PasswordResetRequest {
  resetToken: string;
  newPassword: string;
}

export interface SearchPasswordResponse {
  success: boolean;
  message: string;
}

// ─── 전화번호 인증 ────────────────────────────────────────────────────────────

export interface SendVerificationCodeRequest {
  phoneNumber: string;
}

export interface SendVerificationCodeResponse {
  success: boolean;
  expiresIn: number;
  verificationCode?: string;
}

export interface PhoneVerificationRequest {
  phoneNumber: string;
  verificationCode: string;
}

export interface PhoneVerificationResponse {
  success: boolean;
  message: string;
  verificationToken: string;
  expiresIn: number;
}

// ─── 반려동물 ─────────────────────────────────────────────────────────────────

export interface PetAddRequest {
  name?: string;
  breed?: string;
  birthday?: string;
  gender?: "MALE" | "FEMALE";
  academyId: number;
  startDate?: string;
  endDate?: string;
  imageKey?: string;
}

export interface PetUpdateRequest {
  name?: string;
  breed?: string;
  birthday?: string;
  gender?: string;
  petImage?: string;
}

export interface PetResponse {
  id: number;
  name: string;
  species: string;
  breed: string;
  gender: string;
  birthday: string;
  memo: string | null;
}

export interface PetListResponse {
  id: number;
  petName: string;
  petBreed: string;
  petGender: string;
  petBirthday: string;
  academyId: number;
  enrollmentStatus: "WAITING" | "APPROVED" | "CANCELLED";
  academyName: string;
  petImage: string | null;
}

export interface PetDetailResponse {
  id: number;
  petName: string;
  petBreed: string;
  petGender: string;
  petBirthday: string;
  ownerId: number;
  ownerName: string;
  ownerPhone: string;
  academyId: number;
  academyName: string;
  academyAddress: string;
  academyAddressDetail: string;
  academySggCode: string;
  academyPhone: string;
  petImage: string | null;
  enrollmentStatus: "WAITING" | "APPROVED" | "CANCELLED";
}

export interface PetPhotoUploadRequest {
  petId: number;
  title?: string;
  description?: string;
  photoType?: "DAILY" | "ACTIVITY" | "MEAL" | "SLEEP" | "ETC";
  s3Key: string;
}

// ─── 학원 ─────────────────────────────────────────────────────────────────────

export interface AcademyResponse {
  id: number;
  name: string;
  address: string;
  addressDetail: string;
  sggCode: string;
  phone: string;
  description: string | null;
  status: string;
}

export interface AcademyScheduleResponse {
  id: number;
  dayOfWeek: "MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT" | "SUN";
  isOpen: boolean;
  operatingStartTime: string;
  operatingEndTime: string;
}

export interface AcademyDetailResponse {
  id: number;
  name: string;
  address: string;
  addressDetail: string;
  sggCode: string;
  phone: string;
  description: string | null;
  status: string;
  academyImage: string | null;
  maxCapacity: number;
  adminId: number;
  adminName: string;
  schedules: AcademyScheduleResponse[];
}

export interface AcademyUpdateRequest {
  name?: string;
  address?: string;
  addressDetail?: string;
  phone?: string;
  description?: string;
  academyImage?: string;
  maxCapacity?: number;
  schedules?: AcademyScheduleUpdateRequest[];
}

export interface AcademyScheduleUpdateRequest {
  id?: number | null;
  dayOfWeek: "MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT" | "SUN";
  isOpen: boolean;
  operatingStartTime: string;
  operatingEndTime: string;
}

export interface DailyScheduleResponse {
  searchDate: string;
  schedule: AcademyScheduleResponse;
  currentReservations: number;
  availableSpots: number;
}

// ─── 학원 등록(Enrollment) ────────────────────────────────────────────────────

export interface EnrollPetRequest {
  academyId: number;
  petId: number;
  startDate?: string;
  endDate?: string;
}

export interface EnrollmentResponse {
  id: number;
  academyId: number;
  petId: number;
  status: "WAITING" | "APPROVED" | "CANCELLED";
  startDate: string;
  endDate: string;
}

export interface EnrollmentListResponse {
  enrollmentId: number;
  academyId: number;
  petId: number;
  petName: string;
  petGender: string;
  petBreed: string;
  status: "WAITING" | "APPROVED" | "CANCELLED";
  startDate: string;
  endDate: string;
  petImage: string | null;
}

// ─── 예약 ─────────────────────────────────────────────────────────────────────

export interface PetReservationRequest {
  petId: number;
  academyId: number;
  reservationDate: string;
  memo?: string;
}

export interface PetReservationResponse {
  id: number;
  petId: number;
  academyId: number;
  petName: string;
  academyName: string;
  reservationDate: string;
}

export interface PetReservationDetailResponse {
  id: number;
  petId: number;
  academyId: number;
  petName: string;
  petBreed: string;
  petBirthday: string;
  ownerName: string;
  ownerPhone: string;
  reservationMemo: string | null;
  petImage: string | null;
}

export interface PetReservationAbleResponse {
  reservationId: number | null;
  reservationAble: boolean;
}

export interface PetReservationListResponse {
  id: number;
  petId: number;
  academyId: number;
  petName: string;
  petBreed: string;
  academyName: string;
  reservationDate: string;
  reservationStatus: string;
  petImage: string | null;
}

export interface AcademyReservationSummaryResponse {
  reservations: PetReservationListResponse[];
  totalCount: number;
  checkedInCount: number;
}

// ─── S3 이미지 ────────────────────────────────────────────────────────────────

export interface ImageUploadResponse {
  s3Key: string;
  originalFileName: string;
  contentType: string;
  fileSize: number;
  presignedUrl: string;
}

export interface PresignedUrlResponse {
  presignedUrl: string;
  s3Key: string;
}

// ─── FCM 푸시 토큰 ────────────────────────────────────────────────────────────

export interface RegisterDeviceTokenRequest {
  token: string;
  platform: "ANDROID" | "IOS" | "WEB";
}

export interface DeleteDeviceTokenRequest {
  token: string;
}
