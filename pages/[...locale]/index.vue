<template>
  <div>
    <div class="w-full relative">
      <div class="relative w-full">
        <img
          :src="BannerImg"
          class="w-full h-full object-cover"
          title="What else do you not know about Japan?"
          alt="What else do you not know about Japan?"
        />

        <!-- Text & Search on Banner -->
        <div
          class="absolute bottom-1/3 inset-0 flex flex-col items-center justify-center text-white text-center px-4"
        >
          <h1 class="text-2xl md:text-3xl font-cormorant-aramond">
            {{ $t('homepage.banner') }}
          </h1>
          <div class="w-full max-w-2xl">
            <UCard class="bg-transparent ring-0 shadow-none">
              <form class="flex items-center" @submit.prevent="searchHotels">
                <UInput
                  v-model="searchParams.location"
                  placeholder="Search here..."
                  class="flex-1"
                  :style="{
                    borderStyle: 'none',
                    borderRadius: '0',
                    boxShadow: 'none',
                    outline: 'none',
                    border: 'none',
                  }"
                />
                <BaseButton type="submit" color="primary">Search</BaseButton>
              </form>
            </UCard>
          </div>
        </div>

        <!-- Featured Topics Section -->
        <div
          class="absolute bottom-0 w-full bg-[#012F43CC] py-6 text-white min-h-[200px]"
        >
          <h2 class="text-xl md:text-2xl mb-4 pl-4">
            {{ $t('homepage.featuredTopics') }}
          </h2>
          <div class="flex gap-4 px-6 justify-between">
            <div
              v-for="topic in topics"
              :key="topic.id"
              class="flex flex-row items-center py-4 px-2 bg-transparent text-white rounded-none border shadow-md flex-grow w-full justify-between border-white transition-colors duration-200 hover:bg-white hover:text-[#084A66] hover:border-white"
            >
              <div class="flex flex-row items-center gap-2">
                <h3
                  class="text-center text-base font-bold"
                  :style="{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 1,
                    WebkitBoxOrient: 'vertical',
                  }"
                >
                  {{ topic.name }}
                </h3>
              </div>
              <div class="transition-colors duration-200">></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ImgSection :extra-images="topics" />
    <div class="bg-white p-4">
      <h2 class="flex justify-center text-4xl font-bold text-[#084A66] pb-2">
        {{ $t('homepage.popularAttractions') }}
      </h2>
      <div class="flex flex-wrap justify-center gap-2">
        <BaseButton
          v-for="button in buttons"
          :key="button.id"
          class="flex-1 max-w-[160px] bg-[#084A66] justify-between text-white hover:bg-[#053247] transition-colors duration-200"
          :style="{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            paddingRight: '20px',
          }"
          @click="handleButtonClick(button)"
        >
          <span
            class="inline-block w-[90%] font-bold text-2xl overflow-hidden text-ellipsis whitespace-nowrap"
          >
            {{ button.name }}
          </span>
          <span class="ml-1">></span>
        </BaseButton>

        <BaseButton
          class="flex-1 max-w-[176px] bg-white border border-[#084A66] text-[#084A66] justify-between hover:bg-gray-100 transition-colors duration-200"
          :style="{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }"
          @click="handleMoreOptions"
        >
          {{ moreOptionsLabel }} <span class="ml-1">></span>
        </BaseButton>
      </div>
    </div>
    <!-- Popular Bookings Section -->
    <ListStore :bookings="bookings" />
    <!-- Banner 2 -->
    <div class="relative w-full mt-8">
      <img
        :src="Banner2"
        class="w-full"
        title="Background Banner"
        alt="Background Banner"
      />
      <div
        class="absolute inset-0 flex items-center justify-center text-[#084A66] text-2xl font-bold"
      >
        {{ $t('homepage.enhanceExperience') }}
      </div>
    </div>
    <!-- Articles Section -->
    <div class="articles-section text-white py-8">
      <div class="container mx-auto pl-4">
        <h2 class="text-2xl font-bold text-left mb-6">
          {{ $t('homepage.articles') }}
        </h2>
        <div class="flex mb-6">
          <button
            v-for="category in categories"
            :key="category.id"
            :class="[
              'px-4 py-2 text-lg',
              selectedCategory === category.name
                ? 'border-b-2 border-white'
                : 'text-gray-400',
            ]"
            @click="fetchArticlesByCategory(category.id, category.name)"
          >
            {{ category.name }}
          </button>
        </div>
        <div class="flex flex-wrap w-full gap-6">
          <div
            v-for="(article, index) in getByArticles"
            :key="article.id"
            class="w-full md:w-1/4 flex-grow flex-shrink"
          >
            <div
              class="text-white rounded-none overflow-hidden shadow-none flex flex-col h-full"
            >
              <div
                :class="{
                  'order-2': index === 1,
                  'order-1': index !== 1,
                }"
              >
                <img
                  :src="article.banner_url"
                  class="w-full h-48 object-cover"
                  title="Article Image"
                  :alt="`Article Image : ${article.title}`"
                />
              </div>
              <div
                class="p-4 flex-grow flex-shrink"
                :class="{
                  'order-1': index === 1,
                  'order-2': index !== 1,
                }"
              >
                <h3 class="text-lg font-bold">{{ article.title }}</h3>
                <p class="text-sm text-white mt-2">
                  {{ article.sub_title }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="text-right mt-6">
          <button class="text-white px-4 py-2 rounded">MORE ></button>
        </div>
      </div>
    </div>
    <div class="container mx-auto px-4 py-10">
      <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">
        {{ $t('homepage.faq') }}
      </h2>
      <div class="grid grid-cols-12">
        <!-- Left Sidebar -->
        <div class="col-span-3 flex justify-center">
          <ul class="space-y-2 text-sm text-[#084A66]-400">
            <li
              v-for="(category, index) in cate"
              :key="index"
              class="hover:text-blue-500 cursor-pointer"
            >
              {{ category }}
            </li>
          </ul>
        </div>

        <!-- Right FAQ List -->
        <div class="col-span-9">
          <div>
            <div v-for="(faq, index) in faqs" :key="index" class="py-3">
              <button
                class="flex justify-between items-center w-full text-left font-bold text-lg"
                @click="toggleFAQ(index)"
              >
                {{ faq.question }}
                <span :class="{ 'rotate-180': faq.open }">+</span>
              </button>
              <p v-if="faq.open" class="mt-2 text-gray-600">{{ faq.answer }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Banner2 from '/imgs/img/banner2.png';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import BannerImg from '@/assets/images/banner.png';
import BaseButton from '@/components/BaseButton.vue';
import ImgSection from '@/components/homepage/ImgSection.vue';
import {
  type Category,
  type GetByCategory,
  type ProviderRequest,
} from '@/interface/homepage';

const { t } = useI18n();

const searchParams = ref({
  location: '',
  checkIn: '',
  checkOut: '',
});

const {
  getCategoryStore,
  getCategoryProvider,
  getCategoryArticle,
  getCategoryArticleById,
} = useCategoryStore();
const searchHotels = () => {
  navigateTo('/hotels');
};

const bookings = ref([
  {
    id: 1,
    image: '/imgs/img/product.png',
    title: '上野茶藝館',
    category: 'SPA 按摩 香氛',
    location: '日本 關東 東京',
    tags: ['1對1服務', '文化體驗', '放鬆'],
    price: 200,
  },
  {
    id: 2,
    image: '/imgs/img/product.png',
    title: '上野茶藝館',
    category: 'SPA 按摩 香氛',
    location: '日本 關東 東京',
    tags: ['1對1服務', '文化體驗', '放鬆'],
    price: 200,
  },
  {
    id: 3,
    image: '/imgs/img/product.png',
    title: '上野茶藝館',
    category: 'SPA 按摩 香氛',
    location: '日本 關東 東京',
    tags: ['1對1服務', '文化體驗', '放鬆'],
    price: 200,
  },
  {
    id: 4,
    image: '/imgs/img/product.png',
    title: '上野茶藝館',
    category: 'SPA 按摩 香氛',
    location: '日本 關東 東京',
    tags: ['1對1服務', '文化體驗', '放鬆'],
    price: 200,
  },
  {
    id: 5,
    image: '/imgs/img/product.png',
    title: '上野茶藝館',
    category: 'SPA 按摩 香氛',
    location: '日本 關東 東京',
    tags: ['1對1服務', '文化體驗', '放鬆'],
    price: 200,
  },
  {
    id: 6,
    image: '/imgs/img/product.png',
    title: '上野茶藝館',
    category: 'SPA 按摩 香氛',
    location: '日本 關東 東京',
    tags: ['1對1服務', '文化體驗', '放鬆'],
    price: 200,
  },
  {
    id: 7,
    image: '/imgs/img/product.png',
    title: '上野茶藝館',
    category: 'SPA 按摩 香氛',
    location: '日本 關東 東京',
    tags: ['1對1服務', '文化體驗', '放鬆'],
    price: 200,
  },
  {
    id: 8,
    image: '/imgs/img/product.png',
    title: '上野茶藝館',
    category: 'SPA 按摩 香氛',
    location: '日本 關東 東京',
    tags: ['1對1服務', '文化體驗', '放鬆'],
    price: 200,
  },
]);

const topics = ref<Category[]>([]);
const buttons = ref<Category[]>([]);
const categories = ref<Category[]>([]);
const getByArticles = ref<GetByCategory[]>([]);
const selectedCategory = ref('');

const moreOptionsLabel = '我還想要...';

const handleButtonClick = (button) => {
  console.log('Button clicked:', button);
};

const fetchArticlesByCategory = async (
  categoryId: string,
  categoryName: string,
) => {
  selectedCategory.value = categoryName;
  getByArticles.value = await getCategoryArticleById(categoryId);
};

const handleMoreOptions = () => {
  console.log('Opening more options menu');
};

onMounted(async () => {
  const categoryStore = await getCategoryStore(2);
  topics.value = categoryStore.slice(0, 5);

  const providerRequest: ProviderRequest = { type: 1, provider: 'store' };
  const categoryProvider = await getCategoryProvider(providerRequest);
  buttons.value = categoryProvider.slice(0, 5);

  const categoryArticle = await getCategoryArticle();
  categories.value = categoryArticle.slice(0, 3);
  if (categories.value.length > 0) {
    selectedCategory.value = categories.value[0].name;
    await fetchArticlesByCategory(
      categories.value[0].id,
      categories.value[0].name,
    );
  }
});

const cate = ref([
  '預約與訂單管理',
  '付款與退款政策',
  '行程與旅遊內容',
  '變更與取消規則',
  '會員與帳戶管理',
  '技術與使用問題',
  '客服與緊急聯繫方式',
]);

const faqs = ref([
  {
    question: '如何查看我的預約記錄？',
    answer: '您可以在個人帳戶查看所有預約記錄。',
    open: false,
  },
  {
    question: '預約成功後會收到確認信嗎？',
    answer: '是的，預約成功後系統將自動發送確認信。',
    open: false,
  },
  {
    question: '可以為他人預訂旅遊行程嗎？',
    answer: '是的，您可以為親朋好友預訂行程。',
    open: false,
  },
  {
    question: '預約時需要提供哪些資訊？',
    answer: '需要提供姓名、聯絡方式和支付信息。',
    open: false,
  },
]);

const toggleFAQ = (index) => {
  faqs.value[index].open = !faqs.value[index].open;
};

// SEO
useHead({
  title: t('meta.title'),
  meta: [
    {
      name: 'description',
      content: t('meta.description'),
    },
  ],
});

useSeoMeta({
  title: t('meta.title'),
  ogTitle: t('meta.title'),
  description: t('meta.description'),
  ogDescription: t('meta.description'),
});
</script>
<style scoped>
.articles-section {
  background-image: url('/imgs/img/bg-share.png');
  background-size: cover;
  background-position: center;
}
</style>
