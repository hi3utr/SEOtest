import {
  CATEGORY_ARTICLE_BASE_URL,
  CATEGORY_ARTICLE_DETAIL,
  CATEGORY_STORE_BASE_URL,
} from '@/constants/request';
import type {
  Category,
  CategoryStoreResponse,
  GetByCategory,
  ProviderRequest,
} from '@/interface/homepage';

export const useCategoryStore = () => {
  const { get } = useApi();

  const getCategoryStore = async (type: number): Promise<Category[]> => {
    try {
      const res = await get<CategoryStoreResponse>(
        `${CATEGORY_STORE_BASE_URL}?type=${type}`,
        {},
      );
      return res.data.data.data;
    } catch (error) {
      console.error('Error fetching category store:', error);
      return [];
    }
  };

  const getCategoryProvider = async (
    payload: ProviderRequest,
  ): Promise<Category[]> => {
    try {
      const res = await get<CategoryStoreResponse>(
        `${CATEGORY_STORE_BASE_URL}?type=${payload.type}&provider=${payload.provider}`,
        {},
      );
      return res.data.data.data;
    } catch (error) {
      console.error('Error fetching category store:', error);
      return [];
    }
  };

  const getCategoryArticle = async (): Promise<Category[]> => {
    try {
      const res = await get<CategoryStoreResponse>(
        `${CATEGORY_ARTICLE_BASE_URL}`,
        {},
      );
      return res.data.data.data;
    } catch (error) {
      console.error('Error fetching category store:', error);
      return [];
    }
  };

  const getCategoryArticleById = async (
    id: string,
  ): Promise<GetByCategory[]> => {
    try {
      const res = await get<CategoryStoreResponse>(
        `${CATEGORY_ARTICLE_DETAIL}/get-by-category/${id}`,
        {},
      );
      return res.data.data.data;
    } catch (error) {
      console.error('Error fetching category store:', error);
      return [];
    }
  };

  return {
    getCategoryStore,
    getCategoryProvider,
    getCategoryArticle,
    getCategoryArticleById,
  };
};
