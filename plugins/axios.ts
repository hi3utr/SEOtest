import axios from 'axios';

export default defineNuxtPlugin((nuxtApp) => {
  const { apiHost } = useRuntimeConfig().public;

  const axiosInstance = axios.create({
    baseURL: apiHost,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Request interceptor
  axiosInstance.interceptors.request.use(
    (config) => {
      // You can add auth token here
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  // Response interceptor
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        // Handle unauthorized access
        navigateTo('/login');
      }
      return Promise.reject(error);
    },
  );

  return {
    provide: {
      axios: axiosInstance,
    },
  };
});
