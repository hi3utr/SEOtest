export interface Meta {
  path: string;
  requestId: string;
  timestamp: string;
}
export interface ErrorResponse {
  statusCode: number;
  message: string;
  localizedMessage: string;
  details: string;
  code: string;
}
export interface BaseResponse<T> {
  data?: T;
  error?: ErrorResponse;
  meta: Meta;
}
