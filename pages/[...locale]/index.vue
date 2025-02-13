<template>
  <div>
    <UContainer>
      <!-- Hero Section -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold mb-4">{{ $t('welcome') }}</h1>
        <p class="text-gray-600 max-w-2xl mx-auto">
          Discover handpicked hotels for your next adventure. From luxury
          resorts to cozy boutique stays.
        </p>
      </div>

      <!-- Search Form -->
      <div class="max-w-3xl mx-auto mb-12">
        <UCard>
          <form @submit.prevent="searchHotels">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <UInput
                v-model="searchParams.location"
                placeholder="Where are you going?"
                icon="i-heroicons-map-pin"
              />
              <UInput
                v-model="searchParams.checkIn"
                type="date"
                icon="i-heroicons-calendar"
              />
              <UInput
                v-model="searchParams.checkOut"
                type="date"
                icon="i-heroicons-calendar"
              />
            </div>
            <UButton
              type="submit"
              color="primary"
              class="mt-4 w-full justify-center"
            >
              Search Hotels
            </UButton>
          </form>
        </UCard>
      </div>

      <!-- Featured Hotels Section -->
      <div class="mb-12">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-semibold">Featured Hotels</h2>
          <UButton variant="ghost" color="gray" @click="navigateTo('/hotels')">
            View All
          </UButton>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <HotelCard
            v-for="hotel in featuredHotels"
            :key="hotel.id"
            :hotel="hotel"
          />
        </div>
      </div>

      <!-- Why Choose Us Section -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <UCard v-for="(feature, index) in features" :key="index">
          <div class="text-center p-4">
            <UIcon
              :name="feature.icon"
              class="w-12 h-12 mx-auto mb-4 text-primary"
            />
            <h3 class="text-lg font-semibold mb-2">{{ feature.title }}</h3>
            <p class="text-gray-600">{{ feature.description }}</p>
          </div>
        </UCard>
      </div>
    </UContainer>
    <LanguageSwitcher />
  </div>
</template>

<script setup lang="ts">
import { mockHotels } from '@/utils/mockData';

const { t } = useI18n();

const searchParams = ref({
  location: '',
  checkIn: '',
  checkOut: '',
});

const featuredHotels = ref(mockHotels);

const features = [
  {
    icon: 'i-heroicons-shield-check',
    title: 'Best Price Guarantee',
    description: `Find a lower price? We'll match it and give you an extra 10% off.`,
  },
  {
    icon: 'i-heroicons-heart',
    title: 'Handpicked Hotels',
    description: 'We carefully select every hotel to ensure quality stays.',
  },
  {
    icon: 'i-heroicons-chat-bubble-left-right',
    title: '24/7 Support',
    description: 'Our support team is always here to help you.',
  },
];

const searchHotels = () => {
  // Implement search logic
  navigateTo('/hotels');
};

// SEO
useHead({
  title: t('welcome'),
  meta: [
    {
      name: 'description',
      content: t('meta.description'),
    },
  ],
});
</script>
