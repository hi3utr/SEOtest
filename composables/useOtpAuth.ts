import { jwtDecode } from 'jwt-decode';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { authOTPRepository } from '@/apis/authOTP';
import { ACC_STATUS, MS_PER_SECOND, STEP_OTP } from '@/constants/common';
import { REFRESH_TOKEN, USER_INFO } from '@/constants/storage';
import { setAuthCookie } from '@/utils/auth';

export const useOtpVerification = () => {
  const router = useRouter();
  const isErrOTP = ref(false);
  const repository = authOTPRepository();
  const currentStep = ref(STEP_OTP.EMAIL);
  const idUser = ref('');
  const toast = useToast();
  const handleOtpVerification = async (otp: string) => {
    try {
      const { data, error } = await repository.loginStep3({
        id: idUser.value,
        otp,
      });
      if (data) {
        isErrOTP.value = false;
        const { accessToken, refreshToken, user } = data;
        const jwtRefreshToken = jwtDecode<{ exp: number }>(refreshToken);
        const jwt = jwtDecode<{ exp: number }>(accessToken);
        setAuthCookie(accessToken, {
          expires: new Date(jwt.exp * MS_PER_SECOND),
        });
        setCookie(REFRESH_TOKEN, refreshToken, {
          expires: new Date(jwtRefreshToken.exp * MS_PER_SECOND),
        });
        setCookie(USER_INFO, JSON.stringify(user), {
          expires: new Date(jwt.exp * MS_PER_SECOND),
        });
        router.push('/');
      } else if (error) {
        isErrOTP.value = true;
      }
    } catch (error) {}
  };

  const handleNameStepComplete = async (
    firstName: string,
    lastName: string,
  ) => {
    try {
      const res = await repository.loginStep2({
        id: idUser.value,
        first_name: firstName,
        last_name: lastName,
      });
      if (res.data) {
        // Move to OTP step
        currentStep.value = STEP_OTP.OTP;
        // Show notification
        toast.add({
          title: 'OTP sent!',
          description: 'An OTP sent to your email. Please check!',
        });
      }
    } catch (error) {}
  };

  const handleEmailStepComplete = async (email: string) => {
    try {
      const { data } = await repository.loginStep1({ email });
      if (data) {
        idUser.value = data?.id;
        // Navigate to Step 2 or Step 3 based on the user's status
        currentStep.value =
          data.status === ACC_STATUS.ACTIVE ? STEP_OTP.OTP : STEP_OTP.NAME;
      }
    } catch (error) {}
  };
  return {
    isErrOTP,
    currentStep,
    handleOtpVerification,
    handleEmailStepComplete,
    handleNameStepComplete,
  };
};
