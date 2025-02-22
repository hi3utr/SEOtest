<template>
  <div class="w-full py-10 bg-[#012F43] text-white">
    <div :class="gridClass" class="gap-4 px-6">
      <div v-if="extraImages.length >= 2" class="flex flex-col gap-4 h-screen">
        <div
          v-for="(image, index) in [extraImages[0], extraImages[1]]"
          :key="index"
          class="relative group overflow-hidden rounded-none shadow-md flex-1"
        >
          <img
            :src="image.banner_url"
            class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            alt="Featured Topics"
            title="Featured Topics"
          />
          <div
            :class="[
              'absolute flex flex-col text-white text-2xl font-bold',
              index === 0
                ? 'bottom-0 right-0 p-4 items-end'
                : 'bottom-0 left-0 p-4 items-startstart',
            ]"
          >
            <div>{{ image.name }}</div>
            <div class="text-xs font-bold">{{ image.sub_name }}</div>
          </div>
        </div>
      </div>

      <div
        v-if="extraImages.length === 5"
        class="relative group overflow-hidden rounded-none shadow-md h-screen"
      >
        <img
          :src="extraImages[2].banner_url"
          class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          alt="Featured Topics"
          title="Featured Topics"
        />
        <div
          class="absolute inset-0 flex flex-col items-end justify-end bg-opacity bottom-4 right-4"
        >
          <div class="text-white text-2xl font-bold">
            {{ extraImages[2].name }}
          </div>
          <div class="text-white text-xs font-bold">
            {{ extraImages[2].sub_name }}
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-4 h-screen">
        <template v-if="extraImages.length === 3">
          <div
            class="relative group overflow-hidden rounded-none shadow-md flex-1"
          >
            <img
              :src="extraImages[2].banner_url"
              class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              alt="Featured Topics"
              title="Featured Topics"
            />
            <div class="absolute bottom-4 right-4 text-white text-right">
              <div class="text-2xl font-bold">
                {{ extraImages[2].name }}
              </div>
              <div class="text-xs font-bold">
                {{ extraImages[2].sub_name }}
              </div>
            </div>
          </div>
        </template>

        <template v-else-if="extraImages.length >= 4">
          <div
            v-for="(image, index) in [
              extraImages[extraImages.length === 5 ? 3 : 2],
              extraImages[extraImages.length === 5 ? 4 : 3],
            ]"
            :key="index + 3"
            class="relative group overflow-hidden rounded-none shadow-md flex-1"
          >
            <img
              :src="image.banner_url"
              class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              alt="Featured Topics"
              title="Featured Topics"
            />
            <div
              :class="[
                'absolute flex flex-col text-white text-2xl font-bold',
                index === 0
                  ? 'bottom-0 right-0 p-4 items-end'
                  : 'bottom-0 left-0 p-4 items-startstart',
                ,
              ]"
            >
              <div>{{ image.name }}</div>
              <div class="text-xs font-bold">{{ image.sub_name }}</div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue';
import { Category } from '@/interface/homepage';

const props = defineProps<{
  extraImages: Category[];
}>();

const gridClass = computed(() => {
  if (props.extraImages.length === 3 || props.extraImages.length === 4)
    return 'grid grid-cols-2 h-full';
  if (props.extraImages.length === 5) return 'grid grid-cols-3 h-full';
  return 'grid grid-cols-2 h-full';
});
</script>
