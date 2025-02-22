<template>
  <div class="relative inline-block">
    <div
      class="flex items-center space-x-2 rounded px-3 py-1 cursor-pointer bg-transparent"
      @click="toggleDropdown"
    >
      <nuxt-img
        :src="getFlag(locale)"
        class="w-6 h-6 rounded-full"
        alt="Flag"
      />
      <svg
        class="w-4 h-4 text-white"
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

    <div
      v-if="isOpen"
      class="absolute mt-1 w-full bg-transparent shadow-lg rounded z-10"
    >
      <ul class="py-1">
        <li
          v-for="loc in availableLocales"
          :key="loc.code"
          class="flex items-center py-2 hover:bg-transparent cursor-pointer"
          @click="switchLanguage(loc.code)"
        >
          <img
            :src="getFlag(loc.code)"
            class="rounded-full mx-auto"
            alt="Flag"
            title="Flag"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

const { locale } = useI18n();
const router = useRouter();
const isOpen = ref(false);

const availableLocales = computed(() => [
  { code: 'en', name: 'English' },
  { code: 'ja', name: '日本語' },
  { code: 'ko', name: '한국어' },
  { code: 'zh', name: '中文' },
]);

const getFlag = (code) => {
  return `imgs/locale/${code}.svg`;
};

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const switchLanguage = (langCode) => {
  locale.value = langCode;
  isOpen.value = false;
  const path = langCode === 'en' ? '/' : `/${langCode}`;
  router.push(path);
};
</script>
