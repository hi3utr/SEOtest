import { ACCESS_TOKEN, REFRESH_TOKEN, USER_INFO } from '@/constants/storage';
import { deleteCookie, getCookie, setCookie } from '#imports';

const tokenKey = 'token';

export function setAuthCookie(
  value: Parameters<typeof setCookie>[1],
  attributes: Parameters<typeof setCookie>[2],
) {
  setCookie(tokenKey, value, attributes);
}

export function getAuthCookie() {
  return getCookie(tokenKey);
}

export function deleteAuthCookie() {
  deleteCookie(ACCESS_TOKEN);
  deleteCookie(REFRESH_TOKEN);
  deleteCookie(USER_INFO);
}
