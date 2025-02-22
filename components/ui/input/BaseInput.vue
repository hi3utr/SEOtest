<script setup lang="ts">
import { input } from './variants';

defineProps<{
  modelValue?: string;
  size?: 'sm' | 'md' | 'lg';
  borderColor?: 'blue';
  invalid?: boolean;
}>();
defineEmits(['update:modelValue']);
</script>

<template>
  <input
    :class="input({ size, borderColor, invalid })"
    :value="modelValue"
    @input="
      $emit('update:modelValue', ($event?.target as HTMLInputElement)?.value)
    "
  />
</template>
