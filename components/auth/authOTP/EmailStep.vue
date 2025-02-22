<template>
  <form @submit.prevent="goToNameStep">
    <div class="mb-4">
      <UInput
        v-model="email"
        type="email"
        placeholder="johndoe@email.com"
        label="Email"
        size="lg"
      />
    </div>
    <p class="text-red text-md font-normal mb-2 mt-0 pt-0">
      {{ errors.email }}
    </p>

    <UButton :disabled="!meta.valid" block color="primary" class="mb-4" type="submit" >
      Continue
    </UButton>
  </form>
</template>

<script setup lang="ts">
import type { FormContext, GenericObject } from 'vee-validate';

const props = defineProps<{
  form: FormContext<GenericObject, GenericObject>;
}>();
const emit = defineEmits<{
  onSubmit: [];
}>();
const { defineField, handleSubmit, errors, meta } = props.form;
const [email] = defineField<string>('email');
const goToNameStep = handleSubmit((values) => {
  if (values.email) {
    emit('onSubmit');
  }
});
</script>
