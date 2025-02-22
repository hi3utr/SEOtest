<template>
  <footer class="text-white w-full">
    <div class="w-full mx-auto">
      <div
        class="flex flex-col md:flex-row justify-between items-center p-12 bg-[#0A4B65]"
      >
        <div
          class="flex flex-col items-center md:items-start text-center md:text-left"
        >
          <img :src="LogoWhite" alt="Logo" title="Logo" />
          <div class="flex space-x-4 mt-2">
            <img :src="Facebook" alt="Facebook" title="Facebook" />
            <img :src="Instagram" alt="Instagram" title="Instagram" />
          </div>
          <p class="text-sm mt-2">
            Copyright &copy; 2025 Coday. All rights reserved
          </p>
        </div>

        <!-- Links -->
        <div
          class="flex flex-col md:flex-row mt-6 md:mt-0 space-y-4 md:space-y-0 md:space-x-12"
        >
          <div>
            <h2 class="font-bold">Coday</h2>
            <ul class="mt-2 space-y-1 text-sm">
              <li>
                <a href="#" class="hover:underline">{{
                  $t('footer.aboutUs')
                }}</a>
              </li>
              <li>
                <a href="#" class="hover:underline">{{
                  $t('footer.termsAndConditions')
                }}</a>
              </li>
              <li>
                <a href="#" class="hover:underline">{{
                  $t('footer.privacyPolicy')
                }}</a>
              </li>
            </ul>
          </div>
          <div>
            <h2 class="font-bold">{{ $t('footer.partnership') }}</h2>
            <ul class="mt-2 space-y-1 text-sm">
              <li>
                <a href="#" class="hover:underline">{{
                  $t('footer.becomeMerchant')
                }}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
<script setup lang="ts">
import Facebook from '@/assets/images/icons/facebook.svg';
import Instagram from '@/assets/images/icons/instagram.svg';
import LogoWhite from '@/assets/images/logo-white.png';
</script>
