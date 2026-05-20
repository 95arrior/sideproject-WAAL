import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface TermsSelectOption {
  service: boolean;
  privacy: boolean;
  thirdParty: boolean;
  payment: boolean;
  marketing: boolean;
}

export interface ScheduleItem {
  dayOfWeek: string;
  isOpen: boolean;
  operatingStartTime: string;
  operatingEndTime: string;
}

export interface SignupData {
  memberId: string;
  memberPassword: string;
  memberPhone: string;
  memberName: string;
  memberEmail: string;
  termsSelectOption: TermsSelectOption;
  // Academy signup data
  academyName: string;
  academyAddress: string;
  academyAddressDetail: string;
  sggCode: string;
  academyPhone: string;
  maxCapacity: number;
  scheduleList: ScheduleItem[];
  imageKey: string;
  // Parent (pet) signup data
  petName: string;
  petBreed: string;
  petBirthday: string;
  petGender: string;
  petAcademyId: number;
  petStartDate: string;
  petEndDate: string;
  petImageKey: string;
  petImageUrl: string;
  regionCode: string;
  // Academy features
  allowSmall: boolean;
  smallMaxKg: number;
  allowMedium: boolean;
  mediumMaxKg: number;
  allowLarge: boolean;
  largeMaxKg: number;
  hasShuttle: boolean;
  allowShy: boolean;
  hasClass: boolean;
  // Onboarding status
  isAcademyOnboardingCompleted: boolean;
  isParentOnboardingCompleted: boolean;
  // Pet adding mode
  isAddingPet: boolean;
}

interface SignupStore {
  // 상태
  signupData: SignupData;

  // 액션
  updateMemberId: (memberId: string) => void;
  updateMemberPassword: (memberPassword: string) => void;
  updateMemberPhone: (memberPhone: string) => void;
  updateMemberName: (memberName: string) => void;
  updateMemberEmail: (memberEmail: string) => void;
  updateTermsSelectOption: (terms: Partial<TermsSelectOption>) => void;
  updateSignupData: (data: Partial<SignupData>) => void;
  resetSignupData: () => void;

  // Academy features actions
  updateAcademyFeatures: (features: Partial<Pick<SignupData,
    "allowSmall" | "smallMaxKg" | "allowMedium" | "mediumMaxKg" |
    "allowLarge" | "largeMaxKg" | "hasShuttle" | "allowShy" | "hasClass"
  >>) => void;

  // Academy signup actions
  updateAcademyName: (academyName: string) => void;
  updateAcademyAddress: (academyAddress: string) => void;
  updateAcademyAddressDetail: (academyAddressDetail: string) => void;
  updateSggCode: (sggCode: string) => void;
  updateAcademyPhone: (academyPhone: string) => void;
  updateMaxCapacity: (maxCapacity: number) => void;
  updateScheduleList: (scheduleList: ScheduleItem[]) => void;
  updateImageKey: (imageKey: string) => void;
  updateAcademyOnboardingCompleted: (completed: boolean) => void;

  // Parent (pet) signup actions
  updatePetName: (petName: string) => void;
  updatePetBreed: (petBreed: string) => void;
  updatePetBirthday: (petBirthday: string) => void;
  updatePetGender: (petGender: string) => void;
  updatePetAcademyId: (petAcademyId: number) => void;
  updatePetStartDate: (petStartDate: string) => void;
  updatePetEndDate: (petEndDate: string) => void;
  updatePetImageKey: (petImageKey: string) => void;
  updatePetImageUrl: (petImageUrl: string) => void;
  updateRegionCode: (regionCode: string) => void;
  updateParentOnboardingCompleted: (completed: boolean) => void;

  // 유틸리티
  isAllRequiredTermsAgreed: () => boolean;
  isSignupDataComplete: () => boolean;
  isDetailsDataComplete: () => boolean;
  isAcademyOnboardingCompleted: () => boolean;
  isParentOnboardingCompleted: () => boolean;

  // Pet adding mode
  setIsAddingPet: (isAdding: boolean) => void;
  resetPetData: () => void;
}

const initialSignupData: SignupData = {
  memberId: "",
  memberPassword: "",
  memberPhone: "",
  memberName: "",
  memberEmail: "",
  termsSelectOption: {
    service: false,
    privacy: false,
    thirdParty: false,
    payment: false,
    marketing: false,
  },
  // Academy features
  allowSmall: false,
  smallMaxKg: 0,
  allowMedium: false,
  mediumMaxKg: 0,
  allowLarge: false,
  largeMaxKg: 0,
  hasShuttle: false,
  allowShy: false,
  hasClass: false,
  // Academy signup data
  academyName: "",
  academyAddress: "",
  academyAddressDetail: "",
  sggCode: "",
  academyPhone: "",
  maxCapacity: 0,
  scheduleList: [],
  imageKey: "",
  // Parent (pet) signup data
  petName: "",
  petBreed: "",
  petBirthday: "",
  petGender: "",
  petAcademyId: 0,
  petStartDate: "",
  petEndDate: "",
  petImageKey: "",
  petImageUrl: "",
  regionCode: "ALL",
  isAcademyOnboardingCompleted: false,
  isParentOnboardingCompleted: false,
  isAddingPet: false,
};

export const useSignupStore = create<SignupStore>()((set, get) => ({
  // 초기 상태
  signupData: initialSignupData,

  // 회원 ID 업데이트
  updateMemberId: (memberId) =>
    set((state) => ({
      signupData: {
        ...state.signupData,
        memberId,
      },
    })),

  // 회원 비밀번호 업데이트
  updateMemberPassword: (memberPassword) =>
    set((state) => ({
      signupData: {
        ...state.signupData,
        memberPassword,
      },
    })),

  // 회원 전화번호 업데이트
  updateMemberPhone: (memberPhone) =>
    set((state) => ({
      signupData: {
        ...state.signupData,
        memberPhone,
      },
    })),

  // 회원 이름 업데이트
  updateMemberName: (memberName) =>
    set((state) => ({
      signupData: {
        ...state.signupData,
        memberName,
      },
    })),

  // 회원 이메일 업데이트
  updateMemberEmail: (memberEmail) =>
    set((state) => ({
      signupData: {
        ...state.signupData,
        memberEmail,
      },
    })),

  // 약관 동의 업데이트
  updateTermsSelectOption: (terms) =>
    set((state) => ({
      signupData: {
        ...state.signupData,
        termsSelectOption: {
          ...state.signupData.termsSelectOption,
          ...terms,
        },
      },
    })),

  // 전체 데이터 업데이트
  updateSignupData: (data) =>
    set((state) => ({
      signupData: {
        ...state.signupData,
        ...data,
      },
    })),

  // 데이터 초기화
  resetSignupData: () =>
    set({
      signupData: initialSignupData,
    }),

  // Academy features action
  updateAcademyFeatures: (features) =>
    set((state) => ({
      signupData: { ...state.signupData, ...features },
    })),

  // Academy signup actions
  updateAcademyName: (academyName) =>
    set((state) => ({
      signupData: {
        ...state.signupData,
        academyName,
      },
    })),

  updateAcademyAddress: (academyAddress) =>
    set((state) => ({
      signupData: {
        ...state.signupData,
        academyAddress,
      },
    })),

  updateAcademyAddressDetail: (academyAddressDetail) =>
    set((state) => ({
      signupData: {
        ...state.signupData,
        academyAddressDetail,
      },
    })),

  updateSggCode: (sggCode) =>
    set((state) => ({
      signupData: {
        ...state.signupData,
        sggCode,
      },
    })),

  updateAcademyPhone: (academyPhone) =>
    set((state) => ({
      signupData: {
        ...state.signupData,
        academyPhone,
      },
    })),

  updateMaxCapacity: (maxCapacity) =>
    set((state) => ({
      signupData: {
        ...state.signupData,
        maxCapacity,
      },
    })),

  updateScheduleList: (scheduleList) =>
    set((state) => ({
      signupData: {
        ...state.signupData,
        scheduleList,
      },
    })),

  updateImageKey: (imageKey) =>
    set((state) => ({
      signupData: {
        ...state.signupData,
        imageKey,
      },
    })),

  updateAcademyOnboardingCompleted: (completed) =>
    set((state) => ({
      signupData: {
        ...state.signupData,
        isAcademyOnboardingCompleted: completed,
      },
    })),

  // Parent (pet) signup actions
  updatePetName: (petName) =>
    set((state) => ({
      signupData: {
        ...state.signupData,
        petName,
      },
    })),

  updatePetBreed: (petBreed) =>
    set((state) => ({
      signupData: {
        ...state.signupData,
        petBreed,
      },
    })),

  updatePetBirthday: (petBirthday) =>
    set((state) => ({
      signupData: {
        ...state.signupData,
        petBirthday,
      },
    })),

  updatePetGender: (petGender) =>
    set((state) => ({
      signupData: {
        ...state.signupData,
        petGender,
      },
    })),

  updatePetAcademyId: (petAcademyId) =>
    set((state) => ({
      signupData: {
        ...state.signupData,
        petAcademyId,
      },
    })),

  updatePetStartDate: (petStartDate) =>
    set((state) => ({
      signupData: {
        ...state.signupData,
        petStartDate,
      },
    })),

  updatePetEndDate: (petEndDate) =>
    set((state) => ({
      signupData: {
        ...state.signupData,
        petEndDate,
      },
    })),

  updatePetImageKey: (petImageKey) =>
    set((state) => ({
      signupData: {
        ...state.signupData,
        petImageKey,
      },
    })),

  updatePetImageUrl: (petImageUrl) =>
    set((state) => ({
      signupData: {
        ...state.signupData,
        petImageUrl,
      },
    })),

  updateRegionCode: (regionCode) =>
    set((state) => ({
      signupData: {
        ...state.signupData,
        regionCode,
      },
    })),

  updateParentOnboardingCompleted: (completed) =>
    set((state) => ({
      signupData: {
        ...state.signupData,
        isParentOnboardingCompleted: completed,
      },
    })),

  // 필수 약관 모두 동의했는지 확인
  isAllRequiredTermsAgreed: () => {
    const { termsSelectOption } = get().signupData;
    return (
      termsSelectOption.service &&
      termsSelectOption.privacy &&
      termsSelectOption.thirdParty &&
      termsSelectOption.payment
    );
  },

  // 회원가입 데이터가 완성되었는지 확인
  isSignupDataComplete: () => {
    const { signupData } = get();
    return (
      get().isAllRequiredTermsAgreed() &&
      signupData.memberName?.trim() !== "" &&
      signupData.memberPhone?.trim() !== "" &&
      signupData.memberEmail?.trim() !== "" &&
      signupData.memberId?.trim() !== "" &&
      signupData.memberPassword?.trim() !== ""
    );
  },

  // 상세 데이터가 완성되었는지 확인
  isDetailsDataComplete: () => {
    const { signupData } = get();
    return (
      signupData.memberName?.trim() !== "" &&
      signupData.memberPhone?.trim() !== "" &&
      signupData.memberEmail?.trim() !== ""
    );
  },

  // Academy 온보딩 완료 여부 확인
  isAcademyOnboardingCompleted: () => {
    return get().signupData.isAcademyOnboardingCompleted;
  },

  // Parent 온보딩 완료 여부 확인
  isParentOnboardingCompleted: () => {
    return get().signupData.isParentOnboardingCompleted;
  },

  // 강아지 추가 모드 설정
  setIsAddingPet: (isAdding) =>
    set((state) => ({
      signupData: {
        ...state.signupData,
        isAddingPet: isAdding,
      },
    })),

  // 강아지 정보만 초기화 (강아지 추가 등록 시 사용)
  resetPetData: () =>
    set((state) => ({
      signupData: {
        ...state.signupData,
        petName: "",
        petBreed: "",
        petBirthday: "",
        petGender: "",
        petAcademyId: 0,
        petStartDate: "",
        petEndDate: "",
        petImageKey: "",
        petImageUrl: "",
        regionCode: "ALL",
      },
    })),
}));
