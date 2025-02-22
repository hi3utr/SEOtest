import { ref } from 'vue';
import { SOCIAL_MEDIA } from '@/constants/common';
import { useAuthStore } from '@/stores/auth';
import { useFirebase } from '@/utils/firebase';

export const useSocialLogin = () => {
  const authStore = useAuthStore();
  const { signInWithApple, signInWithFacebook, signInWithGoogle } =
    useFirebase();
  const idToken = ref('');
  const signInMethods = {
    [SOCIAL_MEDIA.GOOGLE]: signInWithGoogle,
    [SOCIAL_MEDIA.FACEBOOK]: signInWithFacebook,
    [SOCIAL_MEDIA.APPLE]: signInWithApple,
  };
  const handleSocialLogin = async (provider: string) => {
    // Implement social login logic
    idToken.value = (await signInMethods[provider]()) as string;
    if (idToken.value) {
      await authStore.loginWithFirebase({
        idToken: idToken.value,
        method: provider,
      });
    }
  };

  return {
    handleSocialLogin,
  };
};
