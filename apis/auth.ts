import { useNuxtApp } from '#app';
import type { SSOLoginRequest, SSOLoginResponse } from '@/interface/auth';

export const loginWithSSO = async (
  payload: SSOLoginRequest,
): Promise<[SSOLoginResponse | null, string | null, any]> => {
  const { $backend } = useNuxtApp();
  return await $backend({
    method: 'POST',
    url: '/user/auth/login/sso',
    data: payload,
  });
};
