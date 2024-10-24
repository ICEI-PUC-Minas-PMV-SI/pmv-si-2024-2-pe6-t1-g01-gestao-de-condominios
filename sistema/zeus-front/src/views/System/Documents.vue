<script setup lang="ts">
import { computed, ref } from 'vue';
import { useThemeStore } from '@/stores/theme'
import { storeToRefs } from 'pinia';
import DocumentList from '@/components/System/document/DocumentList.vue';
import axios from '@/services/axiosInstace';
import type DocumentDto from '@/interfaces/document/documentDto';
import { useDocumentStore } from '@/stores/document';
import { useToastStore } from '@/stores/toast';
import type DocumentPayload from '@/interfaces/document/documentPayload';

const { theme } = storeToRefs(useThemeStore());

const document = ref<DocumentPayload>({
  name: null,
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

    if (document.value.name) formData.append('name', document.value.name);
    if (document.value.description) formData.append('description', document.value.description);
    if (document.value.file) formData.append('file', document.value.file);

    const { data }: { data: DocumentDto } = await axios.post('/document', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    useDocumentStore().addDocument(data);
    document.value = { name: null, description: null, file: null };

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
            v-model="document.name"
            density="compact"
            placeholder="Compartilhe uma nova notícia com o seu condomínio"
            variant="outlined"
          ></v-text-field>
        </div>
        <div>
          <v-textarea
            v-model="document.description"
            density="compact"
            placeholder="Coloque aqui uma descrição mais detalhada do assunto"
            variant="outlined"
            rows="2"
          ></v-textarea>
        </div>
        <div>
          <v-file-input
          v-model="document.file"
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

    <DocumentList />

  </v-container>
</template>