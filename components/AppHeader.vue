<template>
  <header class="absolute top-4 left-0 right-0 z-10 bg-transparent">
    <div class="w-full mx-auto px-12">
      <nav class="flex items-center justify-between w-full">
        <!-- Logo -->
        <div class="md:flex flex items-center">
          <NuxtLink to="/" class="flex items-center">
            <img :src="LogoWhite" alt="Logo" title="Logo" />
          </NuxtLink>
        </div>

        <!-- Centered Navigation Links -->
        <div class="hidden md:flex items-center gap-1 space-x-4 mx-auto">
          <NuxtLink
            v-for="item in navigationItems"
            :key="item.path"
            :to="item.path"
            class="text-white font-medium text-[16px] transition-colors"
          >
            {{ $t(item.name) }}
          </NuxtLink>
        </div>

        <!-- Desktop Right Side -->
        <div class="hidden md:flex items-center">
          <LanguageSwitcher />

          <USelect
            v-model="selectedCurrency"
            :options="currencies"
            class="w-18 text-white"
            variant="none"
            color="white"
          />
          <template v-if="!user">
            <BaseButton
              size="md"
              :label="t('header.login')"
              class="w-[90px]"
              color="blue-light"
              @click="navigateTo(`/${locale}/auth`)"
            />
            <BaseButton
              size="md"
              :label="t('header.register')"
              class="w-[90px]"
              variant="outline"
              color="blue-light"
              @click="navigateTo(`/${locale}/auth`)"
            />
          </template>
          <template v-if="user">
            <div class="flex gap-2">
              <p class="text-white my-auto">{{ user.email }}</p>
              <BaseButton
                size="md"
                label="Logout"
                color="blue-light"
                @click="navigateTo(`/${locale}/auth`)"
              />
            </div>
          </template>
        </div>

        <!-- Mobile Menu Button -->

        <div
          class="md:hidden text-white bg-transparent cursor-pointer"
          @click="navigateTo('/auth')"
        >
          <UIcon
            :name="isMenuOpen ? 'i-heroicons-x-mark' : 'i-heroicons-bars-3'"
          />
        </div>
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
            {{ $t(item.name) }}
          </NuxtLink>

          <div class="space-y-3">
            <LanguageSwitcher />
          </div>

          <div class="flex flex-col space-y-2 pt-2">
            <BaseButton
              size="md"
              :label="t('header.login')"
              color="blue-light"
              @click="navigateTo('/auth')"
            />
            <BaseButton
              size="md"
              :label="t('header.register')"
              variant="outline"
              color="blue-light"
              @click="navigateTo('/auth')"
            />
          </div>
        </div>
      </UCard>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import LogoWhite from '@/assets/images/logo-white.png';
import BaseButton from '@/components/ui/button/BaseButton.vue';
import { useUser } from '@/composables/useUser';

const { t, locale } = useI18n();
const isMenuOpen = ref(false);
const selectedCurrency = ref('USD');
const { user } = useUser();
const navigationItems = [
  { name: 'navigation.eventZone', path: '/event' },
  { name: 'navigation.destination', path: '/destination' },
  { name: 'navigation.articleZone', path: '/article' },
];

const currencies = [
  { label: 'USD', value: 'USD' },
  { label: 'TWD', value: 'TWD' },
];
</script>
