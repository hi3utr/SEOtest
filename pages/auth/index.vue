<template>
  <div
    class="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="w-[400px] bg-white rounded-lg p-6 shadow-sm">
      <!-- Step 1: Email -->
      <div v-if="currentStep === 'email'">
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

        <!-- Email Input -->
        <div class="mb-4">
          <UInput
            v-model="email"
            type="email"
            placeholder="johndoe@email.com"
            label="Email"
            size="lg"
          />
        </div>

        <UButton block color="primary" class="mb-4" @click="goToNameStep">
          Continue
        </UButton>
      </div>

      <!-- Step 2: Name -->
      <NameStep
        v-else-if="currentStep === 'name'"
        :email="email"
        @back="currentStep = 'email'"
        @continue="handleNameStepComplete"
      />

      <!-- Step 3: OTP -->
      <OtpStep
        v-else-if="currentStep === 'otp'"
        :email="email"
        @back="currentStep = 'name'"
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
import NameStep from "@/components/auth/NameStep.vue";
import OtpStep from "@/components/auth/OtpStep.vue";
import SocialLoginButtons from "@/components/auth/SocialLoginButtons.vue";

const currentStep = ref("email");
const email = ref("");
const userData = ref({
  email: "",
  firstName: "",
  lastName: "",
  newsletter: false,
});

const goToNameStep = () => {
  if (email.value) {
    currentStep.value = "name";
  }
};

const handleNameStepComplete = (data: {
  firstName: string;
  lastName: string;
  newsletter: boolean;
}) => {
  // Store the user data
  userData.value = {
    email: email.value,
    ...data,
  };
  // Move to OTP step
  currentStep.value = "otp";
  // Show notification
  const toast = useToast();
  toast.add({
    title: "OTP sent!",
    description: "An OTP sent to your email. Please check!",
    color: "green",
  });
};

const handleOtpVerification = (otp: string) => {
  // Implement OTP verification logic
  console.log("Verifying OTP:", otp);
};

const handleSocialLogin = (provider: string) => {
  // Implement social login logic
  console.log("Social login with:", provider);
};
</script>
