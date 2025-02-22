import axios, { type AxiosResponse } from 'axios';
import { jwtDecode } from 'jwt-decode';
import { MS_PER_SECOND } from '@/constants/common';
import { REFESH_TOKEN_REQ } from '@/constants/request';
import { ACCESS_TOKEN, REFRESH_TOKEN, USER_INFO } from '@/constants/storage';

export type ApiResponse<T = any> = [T | null, string | null, any];

export const handleSuccessRes = <T>(
  response: AxiosResponse,
): ApiResponse<T> => {
  return [response.data, null, null];
};

export const handleErrorRes = (error: any): ApiResponse => {
  return error.response.data;
};

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  const backend = axios.create({
    baseURL: config.public.apiHost,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  backend.interceptors.request.use((config) => {
    const token = getCookie(ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  backend.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const refreshToken = getCookie(REFRESH_TOKEN);
        if (refreshToken) {
          try {
            const response = await axios.post(
              `${config.public.apiHost}/${REFESH_TOKEN_REQ}`,
              {
                refreshToken,
              },
            );
            if (response.data) {
              const {
                accessToken,
                refreshToken: newRefreshToken,
                user,
              } = response.data;
              setCookie(REFRESH_TOKEN, newRefreshToken, {
                expires: new Date(
                  jwtDecode<{ exp: number }>(newRefreshToken)?.exp *
                    MS_PER_SECOND,
                ),
              });

              setCookie(ACCESS_TOKEN, accessToken, {
                expires: new Date(
                  jwtDecode<{ exp: number }>(accessToken)?.exp * MS_PER_SECOND,
                ),
              });
              setCookie(USER_INFO, JSON.stringify(user), {
                expires: new Date(
                  jwtDecode<{ exp: number }>(accessToken)?.exp * MS_PER_SECOND,
                ),
              });
              originalRequest.headers.Authorization = `Bearer ${accessToken}`;
              return axios(originalRequest);
            } else {
              deleteCookie(USER_INFO);
              deleteCookie(ACCESS_TOKEN);
              deleteCookie(REFRESH_TOKEN);
            }
          } catch (refreshError) {}
        }
      }
      return handleErrorRes(error);
    },
  );

  return {
    provide: {
      backend,
    },
  };
});
