<script setup lang="ts">
import { ref } from 'vue';
import cellphoneFormatter from '@/utils/cellphoneFormatter'
import type ResidentDto from '@/interfaces/resident/residentDto';
import ResidentModal from './ResidentModal.vue';
import axios from '@/services/axiosInstace';
import { useResidentStore } from '@/stores/resident'
import { storeToRefs } from 'pinia';
import { useToastStore } from '@/stores/toast';

const { residents } = storeToRefs(useResidentStore());

const headers = ref([
  { title: 'Nome', key: 'name', align: 'start' as const },
  { title: 'E-mail', key: 'email', align: 'start' as const },
  { title: 'CPF', key: 'cpf', align: 'start' as const },
  { title: 'Apto/Bloco', key: 'apartment', align: 'start' as const },
  { title: 'Ações', key: 'actions', sortable: false, align: 'end' as const },
]);

const loading = ref(false);
const showModal = ref(false);
const modalMode = ref<'view' | 'update' | 'create' | null>(null);
const search = ref<string | null>();

function getColor(value: string) {
  return 'blue-darken-4';
}

function create() {
  modalMode.value = 'create';
  showModal.value = true
}

function view(resident: ResidentDto) {
  useResidentStore().setResident(resident);
  modalMode.value = 'view';
  showModal.value = true;
}

function update(resident: ResidentDto) {
  useResidentStore().setResident(resident);
  modalMode.value = 'update';
  showModal.value = true;
}

async function remove(resident: ResidentDto) {
  try {
    loading.value = true;
    await axios.delete(`/resident/${resident.id}`);
    useResidentStore().deleteResident(resident);
    useToastStore().showToast({message: 'Morador deletado com sucesso.', type: 'success', color: 'green'});
  } catch (err) {
    console.error(err);
    useToastStore().showToast({message: 'Erro ao deletar morador.', type: 'error', color: 'red'});
  } finally {
    loading.value = false;
  }
}

function closeModal() {
  showModal.value = false;
  modalMode.value = null;
}

async function getResidents() {
  try {
    loading.value = true;
    const { data }: { data: ResidentDto[] } = await axios.get('/resident');
    useResidentStore().setResidents(data);
  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
}

getResidents();
</script>

<template>
  <v-data-table
    :headers="headers"
    :items="residents"
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
          Novo Morador
        </v-btn>
        <ResidentModal
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
    <template v-slot:item.email="{ value }">
      {{ value }}
    </template>
    <template v-slot:item.cpf="{ value }">
      {{ value }}
    </template>
    <template v-slot:item.apartment="{ value }">
      <v-chip v-if="value" :color="getColor(value.block)">
        {{ value.number }} / {{ value.block }}
      </v-chip>
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