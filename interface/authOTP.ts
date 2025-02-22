import type { BaseResponse } from '@/interface/common';

export interface LoginStep1Param {
  email: string;
}
export interface User {
  id: string;
  email: string;
  avatar: string | null;
  status: 'active' | 'inactive';
  metadata: Record<string, any> | null;
  authProvider: 'basic' | 'google' | 'facebook' | 'apple';
  createdAt: string;
  updatedAt: string;
}

export interface LoginStep2Param {
  id: string;
  first_name: string;
  last_name: string;
}
export interface LoginStep3Param {
  id: string;
  otp: string;
}
export type LoginOTPResponse = BaseResponse<{
  id: string;
  email: string;
  avatar: null | string;
  status: string;
  metadata: string | null;
  authProvider: string;
  createdAt: string;
  updatedAt: string;
}>;
export type UserInfo = BaseResponse<{
  accessToken: string;
  refreshToken: string;
  user: User;
}>;

export interface ILoginRepository {
  loginStep1: (payload: LoginStep1Param) => Promise<LoginOTPResponse>;
  loginStep2: (payload: LoginStep2Param) => Promise<LoginOTPResponse>;
  loginStep3: (payload: LoginStep3Param) => Promise<UserInfo>;
}
