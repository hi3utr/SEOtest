// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  colorMode: {
    preference: 'light',
  },
  app: {
    head: {
      title: 'Hotel Booking - Find Your Perfect Stay',
      titleTemplate: '%s - CODAY',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'google-site-verification',
          content: 'XSZNMyQO-XfcaY9XN_oFih54uri9NKE857rd3Vs34E8',
        },
        {
          hid: 'description',
          name: 'description',
          content:
            'Find and book the best hotels worldwide. Get exclusive deals and comfortable stays.',
        },
        {
          hid: 'robots',
          name: 'robots',
          content: 'index, follow',
        },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap',
        },
      ],
      htmlAttrs: {
        lang: 'en',
      },
    },
  },
  modules: [
    '@pinia/nuxt',
    '@nuxt/ui',
    '@vueuse/nuxt',
    '@nuxt/image',
    '@nuxtjs/sitemap',
    '@nuxtjs/i18n',
    '@nuxtjs/robots',
  ],
  runtimeConfig: {
    public: {
      apiHost: '',
    },
  },
  plugins: ['~/plugins/axios'],
  i18n: {
    baseUrl:
      process.env.NODE_ENV === 'production'
        ? 'https://coday.com'
        : 'http://localhost:3000',
    locales: [
      {
        code: 'en',
        iso: 'en-US',
        name: 'English',
        domain:
          process.env.NODE_ENV === 'production'
            ? 'coday.com'
            : 'localhost:3000',
      },
      {
        code: 'ko',
        iso: 'ko-KR',
        name: '한국어',
        domain:
          process.env.NODE_ENV === 'production'
            ? 'coday.com/kr'
            : 'localhost:3000/kr',
      },
      {
        code: 'ja',
        iso: 'ja-JP',
        name: '日本語',
        domain:
          process.env.NODE_ENV === 'production'
            ? 'coday.com/jp'
            : 'localhost:3000/jp',
      },
      {
        code: 'zh',
        iso: 'zh-CN',
        name: '中文',
        domain:
          process.env.NODE_ENV === 'production'
            ? 'coday.com/cn'
            : 'localhost:3000/cn',
      },
    ],
    differentDomains: false,
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
    },
    defaultLocale: 'en',
    strategy: 'prefix_except_default',
    vueI18n: './i18n.config.ts',
  },
  vite: {
    server: {
      allowedHosts: ['coday-web.sotatek.works', 'localhost'],
    },
  },
  site: {
    url: 'https://coday-web.sotatek.works/',
    name: 'CODAY WEB',
  },
  nitro: {
    routeRules: {
      '/**': {
        headers: {
          'X-Robots-Tag': 'index, follow',
        },
        prerender: true,
      },
    },
  },
});
