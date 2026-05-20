import { api } from "../utils/api";
import type {
  ApiDto,
  RegisterDeviceTokenRequest,
  DeleteDeviceTokenRequest,
} from "./types";

export const pushTokenService = {
  /** FCM 토큰 등록 (업서트) */
  async registerToken(body: RegisterDeviceTokenRequest) {
    return api.post<ApiDto<object>>("/api/v1/push-tokens", body);
  },

  /** FCM 토큰 삭제 */
  async deleteToken(body: DeleteDeviceTokenRequest) {
    return api.delete<ApiDto<object>>("/api/v1/push-tokens", { body });
  },
};
