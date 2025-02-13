<template>
  <header class="py-4 bg-[#ABBDDC]">
    <div>
      <nav class="flex items-center justify-between w-full">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center">
          <span class="text-2xl font-[500] text-white">CODAY</span>
        </NuxtLink>

        <!-- Desktop Right Side -->
        <div class="hidden md:flex items-center space-x-4">
          <NuxtLink
            v-for="item in navigationItems"
            :key="item.path"
            :to="item.path"
            class="text-white hover:text-[#38bdf8] transition-colors"
          >
            {{ item.name }}
          </NuxtLink>
          <div class="flex items-center space-x-2">
            <img
              src="@/assets/images/icons/chinese-logo.svg"
              alt="Chinese Logo"
            />
          </div>
          <LanguageSwitcher />
          <USelect
            v-model="selectedCurrency"
            :options="currencies"
            class="w-24"
            variant="none"
            color="white"
          />
          <BaseButton
            variant="link"
            color="white"
            class="text-white"
            @click="navigateTo('/auth')"
          >
            Login
          </BaseButton>
          <BaseButton variant="solid" @click="navigateTo('/auth')">
            Create account
          </BaseButton>
        </div>

        <!-- Mobile Menu Button -->
        <UButton
          variant="ghost"
          color="white"
          class="md:hidden"
          @click="isMenuOpen = !isMenuOpen"
        >
          <UIcon
            :name="isMenuOpen ? 'i-heroicons-x-mark' : 'i-heroicons-bars-3'"
          />
        </UButton>
      </nav>

      <!-- Mobile Menu -->
      <UCard
        v-if="isMenuOpen"
        class="md:hidden fixed inset-x-0 top-[72px] z-50 m-2"
      >
        <div class="flex flex-col space-y-4 p-4">
          <NuxtLink
            v-for="item in navigationItems"
            :key="item.path"
            :to="item.path"
            class="hover:text-[#38bdf8] transition-colors py-2"
            @click="isMenuOpen = false"
          >
            {{ item.name }}
          </NuxtLink>

          <div class="space-y-3">
            <USelect
              v-model="selectedLanguage"
              :options="languages"
              icon="i-heroicons-globe-alt"
            />
            <USelect v-model="selectedCurrency" :options="currencies" />
          </div>

          <div class="flex flex-col space-y-2 pt-2">
            <UButton
              variant="outline"
              color="gray"
              @click="navigateTo('/auth')"
            >
              Login
            </UButton>
            <UButton color="primary" @click="navigateTo('/auth')">
              Create account
            </UButton>
          </div>
        </div>
      </UCard>
    </div>
  </header>
</template>

<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue';

const isMenuOpen = ref(false);
const selectedLanguage = ref('en');
const selectedCurrency = ref('USD');

const navigationItems = [
  { name: 'Home', path: '/' },
  { name: 'Event Zone', path: '/event' },
  { name: 'Destination', path: '/destination' },
  { name: 'Article Zone', path: '/article' },
];

const languages = [
  { label: 'EN', value: 'en' },
  { label: '中文', value: 'zh' },
];

const currencies = [
  { label: 'USD', value: 'USD' },
  { label: 'TWD', value: 'TWD' },
];
</script>
