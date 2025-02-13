export const useApi = () => {
  const { $axios } = useNuxtApp();
  const { apiHost } = useRuntimeConfig().public;

  $axios.defaults.baseURL = apiHost;

  // Request interceptor
  $axios.interceptors.request.use(
    (config) => {
      // You can modify request config here
      // For example, add auth tokens
      // const token = localStorage.getItem('token');
      // if (token) {
      //   config.headers.Authorization = `Bearer ${token}`;
      // }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  // Response interceptor
  $axios.interceptors.response.use(
    (response) => {
      // You can modify successful responses here
      return response;
    },
    (error) => {
      // Handle different error status codes
      const status = error?.response?.status;
      switch (status) {
        case 401:
          // Handle unauthorized
          break;
        case 403:
          // Handle forbidden
          break;
        case 404:
          // Handle not found
          break;
        case 500:
          // Handle server error
          break;
        default:
          // Handle other errors
          break;
      }
      return Promise.reject(error);
    },
  );

  const get = async <T>(url: string, params?: object) => {
    try {
      const response = await $axios.get<T>(url, { params });
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  };

  const post = async <T>(url: string, data: any) => {
    try {
      const response = await $axios.post<T>(url, data);
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  };

  const put = async <T>(url: string, data: any) => {
    try {
      const response = await $axios.put<T>(url, data);
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  };

  const del = async <T>(url: string) => {
    try {
      const response = await $axios.delete<T>(url);
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  };

  const handleError = (error: any) => {
    // Handle specific errors not caught by interceptor
    console.error('API Error:', error);
  };

  return {
    get,
    post,
    put,
    del,
  };
};
