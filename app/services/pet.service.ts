import { api } from "../utils/api";
import type {
  ApiDto,
  PetAddRequest,
  PetUpdateRequest,
  PetResponse,
  PetListResponse,
  PetDetailResponse,
  PetPhotoUploadRequest,
} from "./types";

export const petService = {
  /** 내 반려동물 목록 조회 (보호자용) */
  async getMyPets() {
    return api.get<ApiDto<PetListResponse[]>>("/api/v1/pets");
  },

  /** 반려동물 등록 */
  async registerPet(body: PetAddRequest) {
    return api.post<ApiDto<PetResponse>>("/api/v1/pets", body);
  },

  /** 반려동물 정보 수정 */
  async updatePet(petId: number, body: PetUpdateRequest) {
    return api.put<ApiDto<PetResponse>>(`/api/v1/pets/${petId}`, body);
  },

  /** 반려동물 삭제 */
  async deletePet(petId: number) {
    return api.delete<ApiDto<object>>(`/api/v1/pets/${petId}`);
  },

  /** 반려동물 상세 조회 (보호자 → 학원용) */
  async getPetByMember(petId: number, memberId: number) {
    return api.get<ApiDto<PetDetailResponse>>(
      `/api/v1/pets/${petId}/members/${memberId}`,
    );
  },

  /** 반려동물 상세 조회 (학원용) */
  async getPetByAcademy(academyId: number, petId: number) {
    return api.get<ApiDto<PetDetailResponse>>(
      `/api/v1/academies/${academyId}/pets/${petId}`,
    );
  },

  /** 반려동물 사진 업로드 (학원 관리자) */
  async uploadPetPhoto(body: PetPhotoUploadRequest) {
    return api.post<ApiDto<object>>("/api/v1/pet-photos/upload", body);
  },
};
