import { defineI18nConfig } from '#i18n';
import en from '@/i18n/locales/en.json';
import ja from '@/i18n/locales/ja.json';
import ko from '@/i18n/locales/ko.json';
import zh from '@/i18n/locales/zh.json';

export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  globalInjection: true,
  messages: {
    zh,
    en,
    ja,
    ko,
  },
}));
