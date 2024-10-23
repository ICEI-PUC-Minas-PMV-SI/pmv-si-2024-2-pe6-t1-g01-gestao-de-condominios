<script setup lang="ts">
import { computed, ref } from 'vue';
import { useThemeStore } from '@/stores/theme'
import { storeToRefs } from 'pinia';
import NewsFeedList from '@/components/System/newsFeed/NewsFeedList.vue';
import axios from '@/services/axiosInstace';
import type NewsFeedDto from '@/interfaces/newsFeed/newsFeedDto';
import { useNewsFeedStore } from '@/stores/newsFeed';
import { useToastStore } from '@/stores/toast';
import type NewsFeedPayload from '@/interfaces/newsFeed/newsFeedPayload';

const { theme } = storeToRefs(useThemeStore());

const newsFeed = ref<NewsFeedPayload>({
  title: null,
  description: null,
  file: null
})

const btnColor = computed(() => {
  return theme.value === 'light' ? 'bg-blue-darken-1' : 'bg-blue-darken-2'
})
const hoverBtnColor = computed(() => {
  return theme.value === 'light' ? 'custom-hover-btn-light' : 'custom-hover-btn-dark'
})

async function create() {
  try {
    const formData = new FormData();

    if (newsFeed.value.title) formData.append('title', newsFeed.value.title);
    if (newsFeed.value.description) formData.append('description', newsFeed.value.description);
    if (newsFeed.value.file) formData.append('file', newsFeed.value.file);

    const { data }: { data: NewsFeedDto } = await axios.post('/feed', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    useNewsFeedStore().addNewsFeed(data);
    newsFeed.value = { title: null, description: null, file: null };

    useToastStore().showToast({
      message: 'Notícia cadastrada com sucesso.',
      type: 'success',
      color: 'green'
    })
  } catch (err) {
    console.error(err);
    useToastStore().showToast({
      message: 'Falha ao cadastrar notícia.',
      type: 'error',
      color: 'red'
    })
  }
}
</script>

<template>
  <v-container>
    <v-card class="mr-3 pa-5 mb-3 d-flex" max-width="1100">
      <div class="w-100 mr-3">
        <div>
          <v-text-field
            v-model="newsFeed.title"
            density="compact"
            placeholder="Compartilhe uma nova notícia com o seu condomínio"
            variant="outlined"
          ></v-text-field>
        </div>
        <div>
          <v-textarea
            v-model="newsFeed.description"
            density="compact"
            placeholder="Coloque aqui uma descrição mais detalhada do assunto"
            variant="outlined"
            rows="2"
          ></v-textarea>
        </div>
        <div>
          <v-file-input
          v-model="newsFeed.file"
          class="w-50"
          density="compact"
          variant="outlined"
          label="Insira uma imagem (opcional)"
          hide-details
          ></v-file-input>
        </div>
      </div>
      <div class="align-self-end">
        <v-btn
          :class="btnColor,hoverBtnColor"
          density="comfortable"
          icon="mdi-send-outline"
          @click="create"
        ></v-btn>
      </div>
    </v-card>

    <NewsFeedList />

  </v-container>
</template>