<template>
  <div class="bg-white p-4">
    <h2 class="flex justify-start pb-2 text-4xl font-bold text-[#084A66]">
      {{ $t('homepage.popularBookings') }}
    </h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
      <div
        v-for="booking in bookings"
        :key="booking.id"
        class="shadow-lg rounded-lg overflow-hidden border"
      >
        <img
          :src="booking.image"
          class="w-full h-48 object-cover"
          alt="Popular Booking"
          title="Popular Booking"
        />
        <div class="p-4">
          <h3 class="text-lg font-semibold">{{ booking.title }}</h3>
          <p class="text-sm text-gray-500">{{ booking.category }}</p>
          <p class="text-sm text-gray-500 flex items-center">
            <span class="mr-1">📍</span>{{ booking.location }}
          </p>
          <div class="flex gap-2 mt-2">
            <span
              v-for="tag in booking.tags"
              :key="tag"
              class="bg-gray-200 text-xs px-2 py-1 rounded"
              >{{ tag }}</span
            >
          </div>
          <p class="mt-2 font-bold text-[#084A66]">{{ booking.price }} JPN+</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps<{
  bookings: Array<{
    id: number;
    image: string;
    title: string;
    category: string;
    location: string;
    tags: string[];
    price: number;
  }>;
}>();
</script>

<style scoped>
.grid div {
  transition: transform 0.2s ease-in-out;
}
.grid div:hover {
  transform: scale(1.05);
}
</style>
