<template>
  <div class="space-y-3">
    <UButton
      block
      variant="outline"
      class="justify-start px-4"
      size="lg"
      @click="$emit('social-login', 'google')"
    >
      <div class="flex items-center w-full">
        <img
          src="/assets/images/icons/google.svg"
          alt="Google"
          class="w-5 h-5"
        />
        <span class="flex-1 text-center text-gray-600"
          >Sign up with Google</span
        >
      </div>
    </UButton>

    <UButton
      block
      variant="outline"
      class="justify-start px-4"
      size="lg"
      @click="$emit('social-login', 'facebook')"
    >
      <div class="flex items-center w-full">
        <img
          src="/assets/images/icons/facebook.svg"
          alt="Facebook"
          class="w-5 h-5"
        />
        <span class="flex-1 text-center text-gray-600"
          >Sign up with Facebook</span
        >
      </div>
    </UButton>

    <UButton
      block
      variant="outline"
      class="justify-start px-4"
      size="lg"
      @click="$emit('social-login', 'apple')"
    >
      <div class="flex items-center w-full">
        <img src="/assets/images/icons/apple.svg" alt="Apple" class="h-5" />
        <span class="flex-1 text-center text-gray-600">Sign up with Apple</span>
      </div>
    </UButton>
  </div>
</template>

<script setup lang="ts">
defineEmits<{
  "social-login": [provider: "google" | "facebook" | "apple"];
}>();
</script>
