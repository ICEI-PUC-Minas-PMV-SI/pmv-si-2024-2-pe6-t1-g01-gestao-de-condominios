<script setup lang="ts">
import SiteLayout from '@/components/Site/SiteLayout.vue'
import SystemLayout from '@/components/System/SystemLayout.vue'
import { useThemeStore } from '@/stores/theme';
import { useToastStore } from '@/stores/toast';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';

const { activate, message, type, color } = storeToRefs(useToastStore());
</script>

<template>
  <v-app :theme="useThemeStore().theme">
    <SiteLayout v-if="!useUserStore().isAuthenticated" />
    <SystemLayout v-else />
    <v-snackbar
      v-model="activate"
      :timeout="3000"
      :color="type"
      location="top right"
      :timer="`${color}-darken-2`"
    >
      {{ message }}
    </v-snackbar>
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

