<script setup lang="ts">
import { ref } from 'vue';
import cellphoneFormatter from '@/utils/cellphoneFormatter'
import cpfFormatter from '@/utils/cpfFormatter'
import dataFormatter from '@/utils/dataFormatter'
import type VisitorDto from '@/interfaces/visitors/visitorsDto';
import VisitorsModal from './VisitorsModal.vue';
import axios from '@/services/axiosInstace'; 
import { useVisitorsStore } from '@/stores/visitor'; 
import { storeToRefs } from 'pinia';    
import { useToastStore } from '@/stores/toast';

const { visitors } = storeToRefs(useVisitorsStore());

const headers = ref([
  { title: 'Nome', key: 'name', align: 'start' as const },
  { title: 'CPF', key: 'cpf', align: 'start' as const },
  { title: 'Data de cadastro', key: 'creatAt', align: 'start' as const },
  { title: 'Alterada', key: 'updatedAt', align: 'end' as const },
  { title: 'Ações', key: 'actions', sortable: false, align: 'end' as const },
]);

const loading = ref(false);
const showModal = ref(false);
const modalMode = ref<'view' | 'update' | 'create' | null>(null);
const search = ref<string | null>();

function create() {
  modalMode.value = 'create';
  showModal.value = true
}

function view(visitor: VisitorDto) {
  useVisitorsStore().setVisitor(visitor);
  modalMode.value = 'view';
  showModal.value = true;
}

function update(visitor: VisitorDto) {
    useVisitorsStore().setVisitor(visitor);
    modalMode.value = 'update';
    showModal.value = true;
}

async function remove(visitor: VisitorDto) {
  try {
    loading.value = true;
    await axios.delete(`/visitor/${visitor.id}`);
    useVisitorsStore().deleteVisitor(visitor);
    useToastStore().showToast({message: 'Visitante deletado com sucesso.', type: 'success', color: 'green'});
  } catch (err) {
    console.error(err);
    useToastStore().showToast({message: 'Erro ao deletar visitante.', type: 'error', color: 'red'});
  } finally {
    loading.value = false;
  }
}

function closeModal() {
  showModal.value = false;
  modalMode.value = null;
}

async function getVisitors() {
  try {
    loading.value = true;
    const { data }: { data: VisitorDto[] } = await axios.get('/visitor');
    useVisitorsStore().setVisitors(data);
  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
}

getVisitors();
</script>

<template>
  <v-data-table
    :headers="headers"
    :items="visitors"
    :loading="loading"
  >
    <template v-slot:top>
      <v-toolbar
        flat
        rounded
      >
        <v-toolbar-title>
          <v-text-field
            v-model="search"
            placeholder="Pesquisar"
            prepend-icon="mdi-magnify"
            clearable
            density="compact"
            variant="outlined"
            hide-details
          ></v-text-field>
        </v-toolbar-title>

        <v-divider class="mx-4" inset vertical />
        <v-spacer></v-spacer>

        <v-btn
          color="primary"
          dark
          @click="create"
        >
          <v-icon icon="mdi-plus" />
          Novo Visitante
        </v-btn>
        <VisitorsModal
          :mode="modalMode"
          :showModal="showModal"
          @close="closeModal"
        />

      </v-toolbar>
    </template>
    <template v-slot:loading>
      <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
    </template>
    <template v-slot:item.name="{ item }">
      {{ item.name }} <br>
      <small>{{ cellphoneFormatter(item.cellphone) }}</small>
    </template>
    <template v-slot:item.cpf="{ item }">
      {{ cpfFormatter(item.cpf) }}
    </template>
    <template v-slot:item.creatAt="{ item }">
      {{ dataFormatter(item.createdAt) }} 
    </template>
    <template v-slot:item.updatedAt="{ item }">
      {{ dataFormatter(item.updatedAt) }} 
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        class="me-2"
        size="small"
        color="blue-darken-1"
        icon="mdi-eye"
        @click="view(item)"
      />
      <v-icon
        class="me-2"
        size="small"
        color="yellow-darken-3"
        icon="mdi-pencil"
        @click="update(item)"
      />
      <v-icon
        size="small"
        color="red-darken-2"
        icon="mdi-delete"
        @click="remove(item)"
      />
    </template>
  </v-data-table>
</template>