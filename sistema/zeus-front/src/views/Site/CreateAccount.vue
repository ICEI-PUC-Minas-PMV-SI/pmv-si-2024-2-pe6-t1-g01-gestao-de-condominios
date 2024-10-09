<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import type User from '@/interfaces/user/user';
import axios from '@/services/axiosInstace';
import type SignupResponse from '@/interfaces/auth/signup';

const router = useRouter();

const visible = ref(false)

const options = ref([
  {title: 'MORADOR', value: 'MORADOR'},
  {title: 'SÍNDICO', value: 'SINDICO'},
  {title: 'FUNCIONÁRIO', value: 'PORTEIRO'}
]);

const user = ref<User>({
  role: 'MORADOR',
  email: null,
  password: null
});

async function signup() {
  try {
    const { data }: { data: SignupResponse } = await axios.post('/auth/signup', user.value);
    localStorage.setItem('zeus_accessToken', data.accessToken);
    localStorage.setItem('zeus_user', JSON.stringify(data.user));
    useUserStore().setIsAutenticated(true)
    useUserStore().setUser(data.user)
    router.push('/feed-de-noticias')
  } catch (err) {
    console.error('Erro ao fazer cadastro', err);
  }
}
</script>

<template>
  <v-container class="d-flex flex-column align-center justify-center fill-height">
    <v-card
      class="mx-auto pa-12 pb-8"
      elevation="8"
      max-width="448"
      min-width="376"
      rounded="lg"
    >
      <div class="text-subtitle-1 text-medium-emphasis">Tipo de usuário</div>

      <v-select
        v-model="user.role"
        :items="options"
        variant="outlined"
      ></v-select>

      <div class="text-subtitle-1 text-medium-emphasis">E-mail</div>

      <v-text-field
        v-model="user.email"
        density="compact"
        placeholder="Endereço de E-mail"
        prepend-inner-icon="mdi-email-outline"
        variant="outlined"
      ></v-text-field>

      <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
        Senha
      </div>

      <v-text-field
        v-model="user.password"
        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="visible ? 'text' : 'password'"
        density="compact"
        placeholder="Insira sua senha"
        prepend-inner-icon="mdi-lock-outline"
        variant="outlined"
        @click:append-inner="visible = !visible"
      ></v-text-field>

      <v-btn
        class="mb-3"
        color="blue"
        size="large"
        variant="tonal"
        block
        @click="signup"
      >
        Cadastrar-se
      </v-btn>

      <v-card-text class="text-center">
        <p>Já tem uma conta?</p>
        <div class="mt-3">
          <v-btn
            class="text-blue text-decoration-none"
            variant="text"
          >
            <v-icon icon="mdi-chevron-left"></v-icon> Sign In
        </v-btn>
        </div>
      </v-card-text>
    </v-card>
  </v-container>
</template>
