<template>
  <div
    class="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="w-[400px] bg-white rounded-lg p-6 shadow-sm">
      <!-- Step 1: Email -->
      <div v-if="currentStep === STEP_OTP.EMAIL">
        <h2 class="text-2xl font-semibold text-center mb-6">
          Sign in or create an account
        </h2>

        <!-- Social Login Buttons -->
        <SocialLoginButtons class="mb-6" @social-login="handleSocialLogin" />

        <!-- Divider -->
        <div class="relative my-6">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-200"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-2 bg-white text-gray-500">Or</span>
          </div>
        </div>

        <!-- Step 1: Email -->
        <EmailStep
          :form="EmailForm"
          @on-submit="handleEmailStepComplete(EmailForm.values.email)"
        />
      </div>

      <!-- Step 2: Name -->
      <NameStep
        v-else-if="currentStep === STEP_OTP.NAME"
        :email="EmailForm.values.email"
        :form="nameForm"
        @back="currentStep = STEP_OTP.EMAIL"
        @continue="
          handleNameStepComplete(
            nameForm.values.first_name,
            nameForm.values.last_name,
          )
        "
      />

      <!-- Step 3: OTP -->
      <OtpStep
        v-else-if="currentStep === STEP_OTP.OTP"
        :email="EmailForm.values.email"
        :is-err="isErrOTP"
        @back="currentStep = STEP_OTP.NAME"
        @verify="handleOtpVerification"
        @social-login="handleSocialLogin"
      />

      <!-- Terms -->
      <p class="text-xs text-center text-gray-500">
        By signing in, I agree to Coday's
        <NuxtLink to="/terms" class="text-primary-500">Terms of use</NuxtLink>
        and
        <NuxtLink to="/privacy" class="text-primary-500"
          >Privacy Policy</NuxtLink
        >
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate';
import EmailStep from '@/components/auth/authOTP/EmailStep.vue';
import NameStep from '@/components/auth/authOTP/NameStep.vue';
import OtpStep from '@/components/auth/authOTP/OtpStep.vue';
import SocialLoginButtons from '@/components/auth/SocialLoginButtons.vue';
import { useOtpVerification } from '@/composables/useOtpAuth';
import { useSocialLogin } from '@/composables/useSocialLogin';
import { STEP_OTP } from '@/constants/common';
import { createLoginStep1Schema, createNameAuthSchema } from '@/schemas/auth';

const { t } = useI18n();
const {
  isErrOTP,
  currentStep,
  handleOtpVerification,
  handleEmailStepComplete,
  handleNameStepComplete,
} = useOtpVerification();
const { handleSocialLogin } = useSocialLogin();

// Form for validate
const EmailForm = useForm({
  validationSchema: createLoginStep1Schema(t),
});
const nameForm = useForm({
  validationSchema: createNameAuthSchema(t),
});
definePageMeta({
  layout: false,
});
// SEO
useHead({
  title: t('welcome'),
  meta: [
    {
      name: 'description',
      content: t('meta.description'),
    },
  ],
});
useSeoMeta({
  title: t('welcome'),
  ogTitle: 'My Amazing Site',
  description: 'This is my amazing site, let me tell you all about it.',
  ogDescription: 'This is my amazing site, let me tell you all about it.',
  ogImage: 'https://example.com/image.png',
  twitterCard: 'summary_large_image',
});
</script>
