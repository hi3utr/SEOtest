import { USER_INFO } from '@/constants/storage';
import type { User } from '@/interface/authOTP';
import { useCookie, watch } from '#imports';

export const useUser = () => {
  const user = ref<User | null>(null);
  const userInfo = useCookie(USER_INFO);
  const setUser = (userData: User | null) => {
    user.value = userData;
  };
  const clearUser = () => {
    user.value = null;
  };
  watch(
    userInfo,
    (newValue) => {
      setUser((newValue as User) || null);
    },
    { immediate: true },
  );
  return {
    user,
    setUser,
    clearUser,
  };
};
