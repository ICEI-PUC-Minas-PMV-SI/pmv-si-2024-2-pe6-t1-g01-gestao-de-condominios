<script setup lang="ts">
import { computed } from 'vue'
import { useThemeStore } from '@/stores/theme'

import NavbarRight from '@/components/System/NavbarRight.vue'
import MainHeader from '@/components/System/MainHeader.vue'
import SideBarMenu from '@/components/System/SideBarMenu.vue';

const appBarColor = computed(() => {
  return useThemeStore().theme === 'light' ? 'light-blue-darken-4' : 'blue-grey-darken-3';
})
</script>

<template>
  <v-layout class="bg-blue-grey-lighten-5">
    <v-app-bar :color="appBarColor">
      <template v-slot:prepend>
        <v-img
          class="ml-3"
          :width="200"
          aspect-ratio="16/9"
          cover
          src="/src/assets/logo-dark.png"
        ></v-img>
      </template>
      <template v-slot:append>
        <NavbarRight />
      </template>
    </v-app-bar>

    <v-navigation-drawer permanent>
      <SideBarMenu />
    </v-navigation-drawer>

    <v-main class="ml-5 mt-2" style="min-height: 300px;">
      <MainHeader />
      <router-view />
    </v-main>
  </v-layout>
</template>
