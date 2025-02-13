export default defineNuxtRouteMiddleware((to, _from) => {
  const nuxtApp = useNuxtApp();
  const i18n = nuxtApp.$i18n;

  // Extract locale from route
  const path = to.path;
  const pathLocale = path.split('/')[1];

  // Check if the path contains a valid locale
  const isValidLocale = i18n.locales.value.some((l) => l.code === pathLocale);

  if (path === '/') {
    // Root path stays as default locale (en)
    i18n.locale.value = 'en' as const;
    return;
  }

  if (isValidLocale) {
    // If valid locale in path, set it
    i18n.locale.value = pathLocale as 'en' | 'ko' | 'ja' | 'zh';
    return;
  }

  // If invalid locale, redirect to root
  return navigateTo('/');
});
