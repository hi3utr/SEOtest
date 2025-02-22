import { useNuxtApp } from '#app';

export const useApi = () => {
  const { $backend } = useNuxtApp();
  const get = async <TResponse>(
    url: string,
    params?: object,
  ): Promise<[TResponse | null, string | null, any]> => {
    return await $backend({
      method: 'GET',
      url,
      params,
    });
  };

  const post = async <TResponse, TRequest = unknown>(
    url: string,
    data: TRequest,
  ): Promise<[TResponse | null, string | null, any]> => {
    return await $backend({
      method: 'POST',
      url,
      data,
    });
  };

  const put = async <TResponse, TRequest = unknown>(
    url: string,
    data: TRequest,
  ): Promise<[TResponse | null, string | null, any]> => {
    return await $backend({
      method: 'PUT',
      url,
      data,
    });
  };

  const del = async <TResponse>(
    url: string,
  ): Promise<[TResponse | null, string | null, any]> => {
    return await $backend({
      method: 'DELETE',
      url,
    });
  };

  return {
    get,
    post,
    put,
    del,
  };
};
