<template>
  <footer class="bg-white pt-12 border-t">
    <UContainer>
      <div class="grid grid-cols-1 md:grid-cols-12 gap-8">
        <!-- Stay Connected Section -->
        <div class="md:col-span-3">
          <h3 class="font-semibold text-lg mb-4">Stay Connected</h3>
          <div class="space-y-2">
            <p class="text-sm text-gray-600">Address (Branch): Turkey</p>
            <p class="text-sm text-gray-600">Phone: (+90) 555 55 55</p>
          </div>
          <div class="mt-4">
            <p class="text-sm text-gray-600 mb-3">Follow us on social media</p>
            <div class="flex space-x-3">
              <a
                v-for="social in socialLinks"
                :key="social.name"
                :href="social.url"
                target="_blank"
                rel="noopener noreferrer"
                class="text-gray-600 hover:text-primary"
              >
                <UIcon :name="social.icon" class="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <!-- CoDayLinks Section -->
        <div class="md:col-span-2">
          <h3 class="font-semibold text-lg mb-4">CoDay</h3>
          <ul class="space-y-2">
            <li v-for="link in coDayLinks" :key="link.name">
              <NuxtLink
                :to="link.path"
                class="text-sm text-gray-600 hover:text-primary"
              >
                {{ link.name }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Random Images Section -->
        <div class="md:col-span-4">
          <div class="grid grid-cols-3 gap-2">
            <img
              v-for="(image, index) in randomImages"
              :key="index"
              :src="image"
              :alt="`Random destination ${index + 1}`"
              class="w-20 h-20 rounded-full object-cover"
            />
          </div>
        </div>

        <!-- Become a Merchant Section -->
        <div class="md:col-span-3">
          <h3 class="font-semibold text-lg mb-4">Become a Merchant</h3>
          <p class="text-sm text-gray-600 mb-4">Collaborate With Us Now!</p>
          <form @submit.prevent="subscribeEmail" class="space-y-3">
            <UInput
              v-model="email"
              type="email"
              placeholder="Enter Your Email Address"
              class="w-full"
              :ui="{ rounded: 'rounded-full' }"
              size="lg"
            />
            <UButton
              type="submit"
              color="primary"
              class="w-full justify-center"
              :ui="{ rounded: 'rounded-full' }"
              size="lg"
            >
              SEND EMAIL
            </UButton>
          </form>
        </div>
      </div>

      <!-- Copyright -->
    </UContainer>
    <div
      class="text-center text-sm text-white mt-12 py-3 border-t bg-[#292D32]"
    >
      All Rights Reserved for Pigment Store
    </div>
  </footer>
</template>

<script setup lang="ts">
const email = ref('');

const socialLinks = [
  { name: 'Instagram', icon: 'i-simple-icons-instagram', url: '#' },
  { name: 'LinkedIn', icon: 'i-simple-icons-linkedin', url: '#' },
  { name: 'Facebook', icon: 'i-simple-icons-facebook', url: '#' },
  { name: 'YouTube', icon: 'i-simple-icons-youtube', url: '#' },
  { name: 'Twitter', icon: 'i-simple-icons-twitter', url: '#' },
  { name: 'TikTok', icon: 'i-simple-icons-tiktok', url: '#' },
];

const coDayLinks = [
  { name: 'Term of Use', path: '/terms' },
  { name: 'Privacy Policy', path: '/privacy' },
  { name: 'FAQ', path: '/faq' },
];

// Import images properly
const randomImages = [
  new URL('@/assets/images/paris.png', import.meta.url).href,
  new URL('@/assets/images/beach.png', import.meta.url).href,
  new URL('@/assets/images/venice.png', import.meta.url).href,
  new URL('@/assets/images/santorini.png', import.meta.url).href,
  new URL('@/assets/images/mountains.png', import.meta.url).href,
  new URL('@/assets/images/canal.png', import.meta.url).href,
];

const subscribeEmail = () => {
  // Implement email subscription logic here
  console.log('Subscribe email:', email.value);
  email.value = ''; // Clear input after submission
};
</script>
