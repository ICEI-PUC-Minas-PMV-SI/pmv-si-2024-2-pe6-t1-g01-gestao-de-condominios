<script setup lang="ts">
import SiteLayout from '@/components/Site/SiteLayout.vue'
import SystemLayout from '@/components/System/SystemLayout.vue'
import { useThemeStore } from '@/stores/theme';
import { useUserStore } from '@/stores/user';

console.log(useUserStore().user)
</script>

<template>
  <v-app :theme="useThemeStore().theme">
    <SiteLayout v-if="!useUserStore().isAuthenticated" />
    <SystemLayout v-else />
  </v-app>
</template>

<style>
body {
  background-color: #01579B;
}

@media (min-width: 1024px) {
  #app {
    display: block;
    grid-template-columns: 1fr 1fr;
    padding: 0 0;
    width: 100%;
    margin: 0;
    max-width: none;
  }
}

@media (max-width: 1024px) {
  #app {
    padding: 0 0;
  }
}

.custom-hover-btn-light:hover {
  background-color: #CFD8DC;
}
.custom-hover-btn-dark:hover {
  background-color: #37474F;
}
</style>

