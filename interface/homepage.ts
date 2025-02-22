export interface Category {
  id: string;
  name: string;
  sub_name: string;
  type: string;
  is_publish: boolean;
  publish_date: string;
  banner_url: string;
  description: string;
  created_at: string;
}

export interface GetByCategory {
  id: string;
  title: string;
  is_publish: boolean;
  publish_date: string;
  banner_url: string;
  sub_title: string;
  created_at: string;
  content: string;
}

export interface CategoryStoreResponse {
  data: {
    data: Category[];
    total: number;
    page: number;
  };
  meta: {
    path: string;
    requestId: string;
    timestamp: string;
  };
}

export interface ProviderRequest {
  type: number;
  provider: string;
}
