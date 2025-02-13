<template>
  <div class="relative">
    <select
      v-model="currentLocale"
      class="px-3 py-1 rounded border border-gray-200 appearance-none pr-8 bg-white cursor-pointer"
      @change="switchLanguage"
    >
      <option v-for="loc in availableLocales" :key="loc.code" :value="loc.code">
        {{ loc.name }}
      </option>
    </select>
    <div class="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
      <svg
        class="w-4 h-4 text-gray-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </div>
  </div>
</template>

<script setup>
const { locale, locales } = useI18n();
const router = useRouter();

const availableLocales = computed(() => {
  return locales.value;
});

const currentLocale = computed({
  get: () => locale.value,
  set: (value) => {
    locale.value = value;
  },
});

const switchLanguage = () => {
  const path = currentLocale.value === 'en' ? '/' : `/${currentLocale.value}`;
  router.push(path);
};
</script>
