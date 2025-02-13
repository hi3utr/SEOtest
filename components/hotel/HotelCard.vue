<template>
  <UCard class="hotel-card hover:shadow-lg transition-shadow duration-300">
    <template #header>
      <div class="relative h-48 w-full">
        <img
          :src="hotel.images[0] || 'https://placehold.co/600x400'"
          :alt="hotel.name"
          class="w-full h-full object-cover rounded-t-lg"
        />
        <div class="absolute top-2 right-2">
          <UBadge color="white" class="font-semibold">
            ${{ hotel.price }}/night
          </UBadge>
        </div>
      </div>
    </template>

    <div class="p-4">
      <div class="flex justify-between items-start mb-2">
        <h3 class="text-lg font-semibold">{{ hotel.name }}</h3>
        <div class="flex items-center">
          <UIcon name="i-heroicons-star" class="text-yellow-400 w-5 h-5" />
          <span class="ml-1">{{ hotel.rating }}</span>
        </div>
      </div>

      <div class="flex items-center text-gray-600 mb-2">
        <UIcon name="i-heroicons-map-pin" class="w-4 h-4 mr-1" />
        <span class="text-sm">{{ hotel.location }}</span>
      </div>

      <p class="text-gray-600 text-sm mb-4">{{ hotel.description }}</p>

      <div class="flex flex-wrap gap-2 mb-4">
        <UBadge
          v-for="amenity in hotel.amenities.slice(0, 3)"
          :key="amenity"
          color="gray"
          variant="soft"
        >
          {{ amenity }}
        </UBadge>
        <UBadge v-if="hotel.amenities.length > 3" color="gray" variant="soft">
          +{{ hotel.amenities.length - 3 }} more
        </UBadge>
      </div>

      <div class="flex justify-between items-center">
        <span class="text-sm text-gray-600">{{ hotel.reviews }} reviews</span>
        <UButton
          color="primary"
          variant="solid"
          @click="navigateTo(`/hotels/${hotel.id}`)"
        >
          View Details
        </UButton>
      </div>
    </div>
  </UCard>
</template>

<script setup lang="ts">
interface HotelProps {
  hotel: {
    id: string;
    name: string;
    description: string;
    price: number;
    rating: number;
    location: string;
    images: string[];
    amenities: string[];
    reviews: number;
  };
}

defineProps<HotelProps>();
</script>
