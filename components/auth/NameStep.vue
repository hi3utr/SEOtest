<template>
  <div>
    <div class="flex items-center mb-6">
      <UButton
        icon="i-heroicons-arrow-left"
        variant="ghost"
        class="mr-2"
        @click="emit('back')"
      />
      <h2 class="text-2xl font-semibold">
        First, tell us your preferred name.
      </h2>
    </div>

    <p class="text-gray-600 mb-6">
      We're setting up your account for {{ email }}.<br />
      Please let us know your preferred name to get started.
    </p>

    <div class="space-y-4 mb-6">
      <UInput v-model="firstName" placeholder="First Name" size="lg" />
      <UInput v-model="lastName" placeholder="Last Name" size="lg" />
    </div>

    <!-- Newsletter Checkbox -->
    <UCheckbox
      v-model="newsletter"
      class="mb-6"
      label="I agree to receive updates and promotions about Coday and its affiliates or business partners via various channels, including WhatsApp. Opt out anytime."
    />

    <UButton
      block
      color="primary"
      class="mb-4"
      :disabled="!firstName || !lastName"
      @click="handleContinue"
    >
      Continue
    </UButton>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  email: string;
}>();

const emit = defineEmits<{
  back: [];
  continue: [{ firstName: string; lastName: string; newsletter: boolean }];
}>();

const firstName = ref("");
const lastName = ref("");
const newsletter = ref(false);

const handleContinue = () => {
  if (firstName.value && lastName.value) {
    emit("continue", {
      firstName: firstName.value,
      lastName: lastName.value,
      newsletter: newsletter.value,
    });
  }
};
</script>
