import { jwtDecode } from 'jwt-decode';
import { defineStore } from 'pinia';
import { loginWithSSO } from '@/apis/auth';
import { MS_PER_SECOND } from '@/constants/common';
import { USER_INFO } from '@/constants/storage';
import { deleteAuthCookie, getAuthCookie, ref, setAuthCookie } from '#imports';

export const useAuthStore = defineStore('auth', () => {
  const route = useRoute();
  const router = useRouter();
  const userLoginRequesting = ref(false);
  async function loginWithFirebase(payload: {
    idToken: string;
    method: string;
  }) {
    if (userLoginRequesting.value) {
      return;
    }
    userLoginRequesting.value = true;

    const { data, error } = await loginWithSSO(payload);
    userLoginRequesting.value = false;
    router.push('/');
    if (error) {
      throw error;
    }

    const resToken = data.data.accessToken;
    const jwt = jwtDecode<{ exp: number }>(resToken);
    setAuthCookie(resToken, {
      expires: new Date(jwt.exp * MS_PER_SECOND),
    });
    setCookie(USER_INFO, JSON.stringify(data.data.user), {
      expires: new Date(jwt.exp * MS_PER_SECOND),
    });
    return data;
  }
  function loginOTP(token: string) {
    const jwt = jwtDecode<{ exp: number }>(token);
    setAuthCookie(token, {
      expires: new Date(jwt.exp * MS_PER_SECOND),
    });
    router.push('/');
  }
  function logout() {
    deleteAuthCookie();
    window.location.reload();
    if (route.name !== 'login') {
      const inviteToken = route.query.token;
      router.push({
        name: 'login',
        query: {
          token: inviteToken,
        },
      });
    }
  }

  function isLoggedIn() {
    const token = getAuthCookie();
    if (!token) {
      return false;
    }
    if (jwtDecode<{ exp: number }>(token).exp < Date.now()) {
      return false;
    }
    return true;
  }

  return { loginWithFirebase, loginOTP, logout, isLoggedIn };
});
