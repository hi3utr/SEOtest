<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <UNotifications />
  </div>
</template>

<script setup>
const { locale, locales } = useI18n();
const alternateUrls = computed(() => {
  return locales.value.map((loc) => ({
    hreflang: loc.iso,
    href: loc.domain,
  }));
});

definePageMeta({
  middleware: 'locale',
});

useHead({
  htmlAttrs: {
    lang: locale,
  },
  link: [
    ...alternateUrls.value.map((alt) => ({
      rel: 'alternate',
      hreflang: alt.hreflang,
      href: alt.href,
    })),
  ],
});
</script>
