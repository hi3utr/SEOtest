// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  colorMode: {
    preference: 'light',
  },
  app: {
    head: {
      titleTemplate: '%s',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
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
          href: 'https://fonts.googleapis.com/css2?family=Noto+Serif+TC:wght@300;400;500;600;700&display=swap',
        },
      ],
      htmlAttrs: {
        lang: 'en',
      },
    },
  },
  css: ['@/assets/styles/main.css'],
  modules: [
    '@pinia/nuxt',
    '@nuxt/ui',
    '@vueuse/nuxt',
    '@nuxt/image',
    '@nuxtjs/i18n',
    '@nuxtjs/robots',
    '@nuxtjs/sitemap',
    [
      '@nuxtjs/google-fonts',
      {
        families: {
          'Noto Sans TC': true,
          'Cormorant Garamond': true,
          'Noto Serif TC': true,
        },
      },
    ],
  ],
  runtimeConfig: {
    public: {
      apiHost: '',
      firebaseApiKey: '',
      firebaseAuthDomain: '',
      firebaseProjectId: '',
      firebaseStorageBucket: '',
      firebaseMessagingSenderId: '',
      firebaseAppId: '',
      firebaseMeasurementId: '',
    },
  },
  plugins: ['~/plugins/axios'],
  i18n: {
    baseUrl:
      process.env.NODE_ENV === 'production'
        ? 'https://se-otest.vercel.app'
        : 'http://localhost:3000',
    locales: [
      {
        code: 'en',
        iso: 'en',
        name: 'English',
        file: 'en.json',
        domain:
          process.env.NODE_ENV === 'production'
            ? 'https://se-otest.vercel.app'
            : 'http://localhost:3000',
      },
      {
        code: 'ko',
        iso: 'ko',
        name: '한국어',
        file: 'ko.json',
        domain:
          process.env.NODE_ENV === 'production'
            ? 'https://se-otest.vercel.app/ko'
            : 'http://localhost:3000/ko',
      },
      {
        code: 'ja',
        iso: 'ja',
        name: '日本語',
        file: 'ja.json',
        domain:
          process.env.NODE_ENV === 'production'
            ? 'https://se-otest.vercel.app/ja'
            : 'http://localhost:3000/ja',
      },
      {
        code: 'zh',
        iso: 'zh-hans',
        name: '中文',
        file: 'zh.json',
        domain:
          process.env.NODE_ENV === 'production'
            ? 'https://se-otest.vercel.app/zh'
            : 'http://localhost:3000/zh',
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
      allowedHosts: ['se-otest.vercel.app', 'localhost'],
    },
  },
  site: {
    url: 'https://se-otest.vercel.app/',
    name: 'CODAY WEB',
  },
  sitemap: {
    enabled: true,
    // urls: [
    //   {
    //     loc: '/',
    //     changefreq: 'daily',
    //     priority: 1,
    //     lastmod: new Date().toISOString(),
    //     _i18nTransform: true,
    //   },
    //   {
    //     loc: '/articles',
    //     changefreq: 'daily',
    //     priority: 0.8,
    //     lastmod: new Date().toISOString(),
    //     _i18nTransform: true,
    //   },
    // ],
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
