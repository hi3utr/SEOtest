<template>
  <form @submit.prevent="handleContinue">
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
      <UInput v-model="first_name" placeholder="First Name" size="lg" />
      <p class="text-red text-md font-normal mb-2 mt-0 pt-0">
        {{ errors.first_name }}
      </p>
      <UInput v-model="last_name" placeholder="Last Name" size="lg" />
      <p class="text-red text-md font-normal mb-2 mt-0 pt-0">
        {{ errors.last_name }}
      </p>
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
      :disabled="!meta.valid"
      type="submit"
    >
      Continue {{ meta.valid.toString() }}
    </UButton>
  </form>
</template>

<script setup lang="ts">
import type { FormContext, GenericObject } from 'vee-validate';

const props = defineProps<{
  email: string;
  form: FormContext<GenericObject, GenericObject>;
}>();
const { defineField, handleSubmit, errors, meta } = props.form;

const [first_name] = defineField<string>('first_name');
const [last_name] = defineField<string>('last_name');
const emit = defineEmits<{
  back: [];
  continue: [];
}>();

const newsletter = ref(false);

const handleContinue = handleSubmit((values) => {
  if (values) {
    emit('continue');
  }
});
</script>
