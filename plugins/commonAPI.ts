import axios from 'axios';

export type ApiResponse<T = any> = [T | null, string | null, any];

export const handleErrorRes = (error: any): ApiResponse => {
  return error.response.data;
};

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();

  const commonAPI = axios.create({
    baseURL: config.public.apiHost,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  commonAPI.interceptors.response.use(
    (response) => {
      return response.data;
    },
    (error) => handleErrorRes(error),
  );

  return {
    provide: {
      commonAPI,
    },
  };
});
