<script setup lang="ts">
import { computed } from 'vue'
import { useThemeStore } from '@/stores/theme'

import NavbarRight from '@/components/System/NavbarRight.vue'
import MainHeader from '@/components/System/MainHeader.vue'

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
      <v-list
        density="compact"
        nav
      >
        <v-list-item prepend-icon="mdi-newspaper" title="Feed de Notícias" value="feed-de-noticias"></v-list-item>
        <v-list-item prepend-icon="mdi-home-group" title="Moradores" value="moradores"></v-list-item>
        <v-list-item prepend-icon="mdi-file-document-multiple" title="Documentos" value="documentos"></v-list-item>
        <v-list-item prepend-icon="mdi-camera-front-variant" title="Visitantes" value="visitantes"></v-list-item>
        <v-list-item prepend-icon="mdi-home-clock-outline" title="Visitas" value="visitas"></v-list-item>
        <v-list-item prepend-icon="mdi-account-hard-hat" title="Funcionários" value="funcionarios"></v-list-item>
        <v-list-item prepend-icon="mdi-office-building" title="Apartamentos" value="apartamentos"></v-list-item>
      </v-list>
    </v-navigation-drawer>


    <v-main class="ml-5 mt-2" style="min-height: 300px;">
      <MainHeader />
      <router-view />
    </v-main>
  </v-layout>
</template>
