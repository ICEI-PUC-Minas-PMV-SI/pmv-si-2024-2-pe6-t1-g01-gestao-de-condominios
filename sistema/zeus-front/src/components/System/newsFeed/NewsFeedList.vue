<script setup lang="ts">
import avatarInitials from '@/utils/avatarInitials';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';
import { ref, watch } from 'vue';
import axios from '@/services/axiosInstace';
import type NewsFeedDto from '@/interfaces/newsFeed/newsFeedDto';
import { useNewsFeedStore } from '@/stores/newsFeed';
import type NewsFeedListItem from '@/interfaces/newsFeed/newsFeedListItem';
import type NewsFeedPayload from '@/interfaces/newsFeed/newsFeedPayload';
import { useToastStore } from '@/stores/toast';

const { user } = storeToRefs(useUserStore());
const { newsFeeds } = storeToRefs(useNewsFeedStore());

function avatarConfigInitials(userName) {
  const { initials } = avatarInitials(userName);
  return initials;
}

function avatarConfigColor(userName) {
  const { color } = avatarInitials(userName);
  return color;
}

const loading = ref(false);
const newsFeedsList = ref<NewsFeedListItem[]>()
const newsFeedEdit = ref<NewsFeedPayload>({
  title: null,
  description: null,
  file: null
})

function edit(newsFeed: NewsFeedListItem) {
  newsFeed.editionIsActivated = true;
  newsFeedEdit.value.title = newsFeed.title;
  newsFeedEdit.value.description = newsFeed.description;
}

async function update(newsFeed: NewsFeedListItem) {
  try {
    loading.value = true;
    const formData = new FormData();

    if (newsFeedEdit.value.title) formData.append('title', newsFeedEdit.value.title);
    if (newsFeedEdit.value.description) formData.append('description', newsFeedEdit.value.description);
    if (newsFeedEdit.value.file) formData.append('file', newsFeedEdit.value.file);

    const { data }: { data: NewsFeedDto } = await axios.put(`/feed/${newsFeed.id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    useNewsFeedStore().updateNewsFeed({ oldValue: newsFeed, newValue: data });

    newsFeed.editionIsActivated = false;
    newsFeedEdit.value = { title: null, description: null, file: null };

    useToastStore().showToast({
      message: 'Notícia atualizada com sucesso.',
      type: 'success',
      color: 'green'
    });
  } catch (err) {
    console.error(err);
    useToastStore().showToast({
      message: 'Falha ao atualizar notícia.',
      type: 'error',
      color: 'red'
    });
  } finally {
    loading.value = false;
  }
  
}

async function remove(newsFeed: NewsFeedListItem) {
  try {
    loading.value = true;
    await axios.delete(`/feed/${newsFeed.id}`);
    useNewsFeedStore().deleteNewsFeed(newsFeed.id);
    useToastStore().showToast({
      message: 'Notícia deletado com sucesso.',
      type: 'success',
      color: 'green'
    });
  } catch (err) {
    console.error(err);
    useToastStore().showToast({
      message: 'Erro ao deletar notícia.',
      type: 'error',
      color: 'red'
    });
  } finally {
    loading.value = false;
  }
}

async function getNewsFeeds() {
  try {
    loading.value = true;
    const { data }: { data: NewsFeedDto[] } = await axios.get('/feed');
    useNewsFeedStore().setNewsFeeds(data);
  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
}

getNewsFeeds();

watch(newsFeeds, (newValue, oldValue) => {
  newsFeedsList.value = newsFeeds.value.map(x => {
    return { ...x, file: null, editionIsActivated: false }
  });
}, { deep: true });
</script>

<template>
  <v-card
    :loading="loading"
    class="mr-3 pa-5"
    max-width="1100"
  >
    <v-card v-for="newsFeed in newsFeedsList"class="elevation-0 border-b">
      <div class="text-subtitle-1 py-2 d-flex justify-space-between">
        <div v-if="!newsFeed.editionIsActivated">
          <h3>{{ newsFeed.title }}</h3>
          <p class="mb-4">
            {{ newsFeed.description }}
          </p>
          <v-img
            v-if="newsFeed.link"
            :width="300"
            aspect-ratio="16/9"
            cover
            :src="newsFeed.link"
          ></v-img>
        </div>
        <div v-else class="w-100">
          <div>
            <v-text-field
              v-model="newsFeedEdit.title"
              density="compact"
              placeholder="Compartilhe uma nova notícia com o seu condomínio"
              variant="outlined"
            ></v-text-field>
          </div>
          <div>
            <v-textarea
              v-model="newsFeedEdit.description"
              density="compact"
              placeholder="Coloque aqui uma descrição mais detalhada do assunto"
              variant="outlined"
              rows="2"
            ></v-textarea>
          </div>
          <div>
            <v-file-input
            v-model="newsFeedEdit.file"
            class="w-50"
            density="compact"
            variant="outlined"
            label="Insira uma imagem (opcional)"
            hide-details
            ></v-file-input>
          </div>
        </div>
        <div v-if="!newsFeed.editionIsActivated">
          <v-icon
            class="me-2 ml-3"
            size="small"
            color="yellow-darken-3"
            icon="mdi-pencil"
            @click="edit(newsFeed)"
          />
          <v-icon
            class="me-2 ml-3"
            size="small"
            color="red-darken-3"
            icon="mdi-delete"
            @click="remove(newsFeed)"
          />
        </div>
        <div v-else>
          <v-icon
            class="me-2 ml-3"
            size="small"
            color="yellow-darken-3"
            icon="mdi-content-save"
            @click="update(newsFeed)"
          />
        </div>
      </div>

      <v-list-item class="w-100 ma-2">
        <template v-slot:prepend>
          <v-avatar :color="avatarConfigColor(newsFeed.user.name)">
            <span class="text-h5">{{ avatarConfigInitials(newsFeed.user.name) }}</span>
          </v-avatar>
        </template>

        <v-list-item-title>{{ newsFeed.user.name }}</v-list-item-title>

        <v-list-item-subtitle>{{ newsFeed.user.email }}</v-list-item-subtitle>

        <template v-slot:append>
          <div class="justify-self-end custom-margin">
            <span class="text-subtitle-2 opacity-60">{{ newsFeed.updatedAt }}</span>
          </div>
        </template>
      </v-list-item>
    </v-card>

    <div v-if="!newsFeeds.length" class="text-center text-grey">
      <hr class="mb-4">
      Nenhuma notícia foi encontrada
      <hr class="mt-4">
    </div>
  </v-card>
</template>