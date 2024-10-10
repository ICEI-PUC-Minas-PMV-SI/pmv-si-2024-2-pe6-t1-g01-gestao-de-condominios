<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useThemeStore } from '@/stores/theme'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from "pinia"
import type UserProfileForm from '@/interfaces/user/userProfileForm'

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

const dialog = ref(false);

const visible = ref(false)
const userProfileForm = ref<UserProfileForm>({
  role: 'MORADOR',
  name: null,
  email: null,
  cellphone: null,
  cpf: null,
  password: null
});

function logout() {
  useUserStore().setIsAutenticated(false)
  router.push('/');
}

onMounted(() => {
  userProfileForm.value.email = user.value?.email || null
  userProfileForm.value.name = user.value?.name || null
  userProfileForm.value.cellphone = user.value?.cellphone || null
  userProfileForm.value.cpf = user.value?.cpf || null
})
</script>

<template>
  <div
    v-if="user"
    class="text-center"
    style="line-height: normal; cursor: pointer;"
    @click="dialog = true"
  >
    {{ user.name ?? 'Sem Nome' }} <br>
    <small>{{ user.email }}</small>
  </div>
  <v-btn @click="changeMode">
    <v-icon v-if="theme === 'dark'" icon="mdi-weather-sunny" size="large"/>
    <v-icon v-if="theme === 'light'" icon="mdi-weather-night" size="large"/>
  </v-btn>
  <div class="d-flex ga-3 mr-4">
    <v-btn @click="logout" :style="{ textTransform: 'none' }" :class="appLoginColor,hoverBtnColor">Logout</v-btn>
  </div>
  <v-dialog
    v-model="dialog"
    width="auto"
  >
    <v-card
      max-width="500"
      text="Aqui você pode atualizar os seus dados de perfil, eles serão acessíveis pelos demais usuários."
      title="Perfil do usuário"
    >
      <v-card-text class="py-0">
        <div class="text-subtitle-1 text-medium-emphasis">Nome</div>

        <v-text-field
          v-model="userProfileForm.name"
          density="compact"
          placeholder="Seu nome"
          prepend-inner-icon="mdi-account-outline"
          variant="outlined"
        ></v-text-field>

        <div class="text-subtitle-1 text-medium-emphasis">E-mail</div>

        <v-text-field
          v-model="userProfileForm.email"
          density="compact"
          placeholder="Endereço de E-mail"
          prepend-inner-icon="mdi-email-outline"
          variant="outlined"
        ></v-text-field>

        <div class="text-subtitle-1 text-medium-emphasis">Telefone</div>

        <v-text-field
          v-model="userProfileForm.cellphone"
          density="compact"
          placeholder="Seu telefone"
          prepend-inner-icon="mdi-phone-outline"
          variant="outlined"
        ></v-text-field>

        <div class="text-subtitle-1 text-medium-emphasis">CPF</div>

        <v-text-field
          v-model="userProfileForm.cpf"
          density="compact"
          placeholder="Seu CPF"
          prepend-inner-icon="mdi-card-account-details-outline"
          variant="outlined"
        ></v-text-field>

        <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
          Senha
        </div>

        <v-text-field
          v-model="userProfileForm.password"
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          density="compact"
          placeholder="Insira sua senha"
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
          @click:append-inner="visible = !visible"
        ></v-text-field>
      </v-card-text>

      <template v-slot:actions>
        <v-btn
          class="ms-auto"
          text="Salvar"
          :class="appLoginColor,hoverBtnColor"
          @click="dialog = false"
        ></v-btn>
      </template>
    </v-card>
  </v-dialog>
</template>
