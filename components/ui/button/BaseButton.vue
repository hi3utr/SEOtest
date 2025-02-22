<script setup lang="ts">
import { button } from './variant';

defineProps<{
  variant?: 'solid' | 'outline' | 'link';
  size?: 'sm' | 'md' | 'lg';
  color?: 'blue' | 'blue-light';
  block?: boolean;
  disabled?: boolean;
  label?: string;
}>();
</script>

<template>
  <button
    :class="button({ variant, size, color, disabled, block })"
    :disabled="disabled"
    v-bind="$attrs"
  >
    {{ label }}
    <slot />
  </button>
</template>
