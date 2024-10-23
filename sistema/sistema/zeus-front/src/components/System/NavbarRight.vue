<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useThemeStore } from '@/stores/theme'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from "pinia"
import UserProfileModal from './user/UserProfileModal.vue'

const router = useRouter();
const { theme } = storeToRefs(useThemeStore());
const { user } = storeToRefs(useUserStore());

const appLoginColor = computed(() => {
  return theme.value === 'light' ? 'bg-orange-darken-1' : 'bg-orange-darken-2'
})
const hoverBtnColor = computed(() => {
  return theme.value === 'light' ? 'custom-hover-btn-light' : 'custom-hover-btn-dark'
})

function changeMode() {
  if(theme.value === 'light') {
    useThemeStore().setTheme('dark')
  } else {
    useThemeStore().setTheme('light')
  }
}

const showModal = ref(false);

function logout() {
  useUserStore().setIsAutenticated(false)
  router.push('/');
}
</script>

<template>
  <div
    v-if="user"
    class="text-center"
    style="line-height: normal; cursor: pointer;"
    @click="showModal = true"
  >
    {{ user.name ?? 'Sem Nome' }} <br>
    <small>{{ user.email }}</small>
  </div>
  <v-btn @click="changeMode">
    <v-icon v-if="theme === 'dark'" icon="mdi-weather-sunny" size="large"/>
    <v-icon v-if="theme === 'light'" icon="mdi-weather-night" size="large"/>
  </v-btn>
  <div class="d-flex ga-3 mr-4">
    <v-btn
      :class="appLoginColor,hoverBtnColor"
      :style="{ textTransform: 'none' }"
      @click="logout"
    >
      Logout
    </v-btn>
  </div>
  <UserProfileModal :showModal="showModal" @close="showModal = false" />
</template>
