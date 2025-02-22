import { useNuxtApp } from '#app';
import {
  LOGIN_STEP_1_REQ,
  LOGIN_STEP_2_REQ,
  LOGIN_STEP_3_REQ,
} from '@/constants/request';
import type {
  ILoginRepository,
  LoginOTPResponse,
  LoginStep1Param,
  LoginStep2Param,
  LoginStep3Param,
  UserInfo,
} from '@/interface/authOTP';

export const authOTPRepository = (): ILoginRepository => ({
  async loginStep1(payload: LoginStep1Param): Promise<LoginOTPResponse> {
    const { $commonAPI } = useNuxtApp();
    return await $commonAPI({
      method: 'POST',
      url: LOGIN_STEP_1_REQ,
      data: payload,
    });
  },
  async loginStep2(payload: LoginStep2Param): Promise<LoginOTPResponse> {
    const { $commonAPI } = useNuxtApp();
    return await $commonAPI({
      method: 'PUT',
      url: LOGIN_STEP_2_REQ,
      data: payload,
    });
  },
  async loginStep3(payload: LoginStep3Param): Promise<UserInfo> {
    const { $commonAPI } = useNuxtApp();
    return await $commonAPI({
      method: 'PUT',
      url: LOGIN_STEP_3_REQ,
      data: payload,
    });
  },
});
