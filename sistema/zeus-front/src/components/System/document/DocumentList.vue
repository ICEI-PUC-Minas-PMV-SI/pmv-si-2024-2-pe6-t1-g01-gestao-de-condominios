<script setup lang="ts">
import avatarInitials from '@/utils/avatarInitials';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';
import { ref, watch } from 'vue';
import axios from '@/services/axiosInstace';
import { useDocumentStore } from '@/stores/document';
import type DocumentDto from '@/interfaces/document/documentDto';
import type DocumentListItem from '@/interfaces/document/documentListItem';
import type DocumentPayload from '@/interfaces/document/documentPayload';
import { useToastStore } from '@/stores/toast';

const { user } = storeToRefs(useUserStore());
const { documents } = storeToRefs(useDocumentStore());
const { initials, color } = avatarInitials(user.value?.name);

const loading = ref(false);
const documentsList = ref<DocumentListItem[]>()
const documentEdit = ref<DocumentPayload>({
  name: null,
  description: null,
  file: null
})

function edit(document: DocumentListItem) {
  document.editionIsActivated = true;
  documentEdit.value.name = document.name;
  documentEdit.value.description = document.description;
}

async function update(document: DocumentListItem) {
  try {
    loading.value = true;
    const formData = new FormData();

    if (documentEdit.value.name) formData.append('name', documentEdit.value.name);
    if (documentEdit.value.description) formData.append('description', documentEdit.value.description);
    if (documentEdit.value.file) formData.append('file', documentEdit.value.file);

    const { data }: { data: DocumentDto } = await axios.put(`/document/${document.id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    useDocumentStore().updateDocument({ oldValue: document, newValue: data });

    document.editionIsActivated = false;
    documentEdit.value = { name: null, description: null, file: null };

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

async function remove(document: DocumentListItem) {
  try {
    loading.value = true;
    await axios.delete(`/document/${document.id}`);
    useDocumentStore().deleteDocument(document.id);
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

function downloadFile(documentItem: DocumentListItem) {
  const link = document.createElement('a');
  link.href = documentItem.link;
  link.target = '_blank';
  link.download = documentItem.name;
  link.click();
}

function getFileExtension(url: string): {icon: string, color: string, extension: string } {
  const parts = url.split('.');
  if (parts.length > 1) {
    const extension = parts.pop()?.split(/#|\?/)[0] || null;
    switch (extension) {
      case 'pdf': return {icon: 'mdi-file-pdf-box', color: 'red', extension}
      case 'jpg': return {icon: 'mdi-file-jpg-box', color: 'red', extension}
      case 'png': return {icon: 'mdi-file-png-box', color: 'red', extension}
      case 'zip': return {icon: 'mdi-zip-box', color: 'red', extension}
      case 'xls': return {icon: 'mdi-alpha-x-box', color: 'red', extension}
      case 'xlsb': return {icon: 'mdi-alpha-x-box', color: 'red', extension}
      case 'xlsm': return {icon: 'mdi-alpha-x-box', color: 'red', extension}
      case 'xlsx': return {icon: 'mdi-alpha-x-box', color: 'red', extension}
      case 'csv': return {icon: 'mdi-alpha-x-box', color: 'red', extension}
      case 'doc': return {icon: 'mdi-file-word-box', color: 'red', extension}
      case 'docm': return {icon: 'mdi-file-word-box', color: 'red', extension}
      case 'docx': return {icon: 'mdi-file-word-box', color: 'red', extension}
      default: return {icon: 'mdi-file-document', color: 'red', extension: ''}
    }
  }
  return {icon: 'mdi-file-document', color: 'red', extension: ''};
}

async function getDocuments() {
  try {
    loading.value = true;
    const { data }: { data: DocumentDto[] } = await axios.get('/document');
    useDocumentStore().setDocuments(data);
  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
}

getDocuments();

watch(documents, (newValue, oldValue) => {
  documentsList.value = documents.value.map(x => {
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
    <v-card v-for="document in documentsList"class="elevation-0 border-b">
      <div class="text-subtitle-1 py-2 d-flex justify-space-between">
        <div v-if="!document.editionIsActivated">
          <div class="d-flex">
            <v-icon
              class="mr-2"
              size="large"
              :color="`${getFileExtension(document.link).color}-darken-3`"
              :icon="getFileExtension(document.link).icon"
            />
            <h3
              class="document-title"
              @click="downloadFile(document)"
            >
              <u>
                {{ document.name }}{{
                  getFileExtension(document.link).extension.length
                    ? '.'+getFileExtension(document.link).extension
                    : ''
                }}
              </u>
            </h3>
          </div>
          <p class="mb-4">
            {{ document.description }}
          </p>
          <embed v-if="document.link" :src="document.link">
        </div>
        <div v-else class="w-100">
          <div>
            <v-text-field
              v-model="documentEdit.name"
              density="compact"
              placeholder="Compartilhe uma nova notícia com o seu condomínio"
              variant="outlined"
            ></v-text-field>
          </div>
          <div>
            <v-textarea
              v-model="documentEdit.description"
              density="compact"
              placeholder="Coloque aqui uma descrição mais detalhada do assunto"
              variant="outlined"
              rows="2"
            ></v-textarea>
          </div>
          <div>
            <v-file-input
            v-model="documentEdit.file"
            class="w-50"
            density="compact"
            variant="outlined"
            label="Insira uma imagem (opcional)"
            hide-details
            ></v-file-input>
          </div>
        </div>
        <div v-if="!document.editionIsActivated">
          <v-icon
            class="me-2 ml-3"
            size="small"
            color="yellow-darken-3"
            icon="mdi-pencil"
            @click="edit(document)"
          />
          <v-icon
            class="me-2 ml-3"
            size="small"
            color="red-darken-3"
            icon="mdi-delete"
            @click="remove(document)"
          />
        </div>
        <div v-else>
          <v-icon
            class="me-2 ml-3"
            size="small"
            color="yellow-darken-3"
            icon="mdi-content-save"
            @click="update(document)"
          />
        </div>
      </div>

      <v-list-item class="w-100 ma-2">
        <template v-slot:prepend>
          <v-avatar :color="color">
            <span class="text-h5">{{ initials }}</span>
          </v-avatar>
        </template>

        <v-list-item-title>{{ document.user.name }}</v-list-item-title>

        <v-list-item-subtitle>{{ document.user.email }}</v-list-item-subtitle>

        <template v-slot:append>
          <div class="justify-self-end custom-margin">
            <span class="text-subtitle-2 opacity-60">{{ document.updatedAt }}</span>
          </div>
        </template>
      </v-list-item>
    </v-card>

    <div v-if="!documents.length" class="text-center text-grey">
      <hr class="mb-4">
      Nenhum documento foi encontrado
      <hr class="mt-4">
    </div>
  </v-card>
</template>

<style>
.document-title {
  cursor: pointer;
  color: dodgerblue;
}
</style>