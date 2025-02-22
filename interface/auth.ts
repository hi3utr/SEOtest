export interface User {
  id: string;
  userName: string;
  email: string;
  avatar: string;
  status: string;
  metadata: Record<string, any>;
  authProvider: string;
  firstLogin: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Meta {
  path: string;
  requestId: string;
  timestamp: string;
}

export interface Pagination {
  total: number;
  page: number;
}

export interface SSOLoginRequest {
  idToken: string;
  method: string;
}

export interface SSOLoginResponse {
  data: {
    accessToken: string;
    refreshToken: string;
    user: User;
  };
  meta: Meta;
  pagination: Pagination;
}
