<template>
  <div>
    <div class="flex items-center mb-6">
      <UButton
        icon="i-heroicons-arrow-left"
        variant="ghost"
        class="mr-2"
        @click="emit('back')"
      />
      <h2 class="text-2xl font-semibold">Sign in with OTP</h2>
    </div>

    <p class="text-gray-600 mb-6">
      Enter the OTP provided to the email sent to {{ email }}.
    </p>

    <!-- OTP Input -->
    <div class="flex justify-center space-x-2 mb-6">
      <input
        v-for="(digit, index) in OTP_DIGITS"
        :key="index"
        v-model="otpDigits[index]"
        type="text"
        maxlength="1"
        :class="`w-12 h-12 text-center border rounded-md focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none ${isErr ? 'border-red' : ''}`"
        @input="handleInput($event, index)"
        @keydown.backspace="handleBackspace($event, index)"
        @keydown.delete="handleBackspace($event, index)"
      />
    </div>

    <UButton
      block
      color="primary"
      class="mb-4"
      :disabled="!isOtpComplete"
      @click="verifyOtp"
    >
      Continue
    </UButton>

    <!-- Resend Code -->
    <p class="text-center text-sm">
      <span class="text-gray-500">Resend code in </span>
      <span class="text-primary-500">{{ formattedTimer }}</span>
    </p>

    <!-- Divider -->
    <div class="relative my-6">
      <div class="absolute inset-0 flex items-center">
        <div class="w-full border-t border-gray-200"></div>
      </div>
      <div class="relative flex justify-center text-sm">
        <span class="px-2 bg-white text-gray-500">Or</span>
      </div>
    </div>

    <!-- Social Login Buttons -->
    <SocialLoginButtons @social-login="handleSocialLogin" />
  </div>
</template>

<script setup lang="ts">
import { OTP_DIGITS } from '@/constants/common';

defineProps<{
  email: string;
  isErr: Boolean;
}>();

const emit = defineEmits<{
  back: [];
  verify: [string];
  socialLogin: [string];
}>();

const otpDigits = ref(['', '', '', '', '']);
const timer = ref(60);
const isOtpComplete = computed(() =>
  otpDigits.value.every((digit) => digit !== ''),
);
const formattedTimer = computed(
  () =>
    `${Math.floor(timer.value / 60)}:${(timer.value % 60)
      .toString()
      .padStart(2, '0')}`,
);

// Start countdown timer
onMounted(() => {
  const interval = setInterval(() => {
    if (timer.value > 0) {
      timer.value--;
    } else {
      clearInterval(interval);
    }
  }, 1000);

  onUnmounted(() => clearInterval(interval));
});

const handleInput = (event: Event, index: number) => {
  const input = event.target as HTMLInputElement;
  const value = input.value;

  // Ensure only numbers are entered
  if (!/^\d*$/.test(value)) {
    otpDigits.value[index] = '';
    return;
  }

  // Move to next input
  if (value && index < 4) {
    const nextInput = (event.target as HTMLInputElement).parentElement
      ?.children[index + 1] as HTMLInputElement;
    nextInput?.focus();
  }
};

const handleBackspace = (event: KeyboardEvent, index: number) => {
  if (!otpDigits.value[index] && index > 0) {
    const prevInput = (event.target as HTMLInputElement).parentElement
      ?.children[index - 1] as HTMLInputElement;
    prevInput?.focus();
  }
};

const verifyOtp = () => {
  if (isOtpComplete.value) {
    emit('verify', otpDigits.value.join(''));
  }
};

const handleSocialLogin = (provider: string) => {
  // Implement social login logic
  console.log('Social login with:', provider);
};
</script>
