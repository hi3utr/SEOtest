<template>
  <UButton v-bind="$attrs" class="rounded-none">
    <slot />
  </UButton>
</template>

<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
});
</script>
