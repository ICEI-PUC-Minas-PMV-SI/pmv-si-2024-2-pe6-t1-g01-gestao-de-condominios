<script setup lang="ts">
import { ref } from 'vue';
import cellphoneFormatter from '@/utils/cellphoneFormatter'
import type ResidentDto from '@/interfaces/resident/residentDto';
import ResidentModal from './ResidentModal.vue';
import axios from '@/services/axiosInstace';
import { useResidentStore } from '@/stores/resident'
import { storeToRefs } from 'pinia';

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
  if(value === 'A') return 'green-darken-4'
  else return 'orange-darken-4'
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

const snackbarMessage = ref<string>('');
const snackbarToast = ref<boolean>(false);
const snackbarType = ref<'info' | 'warning' | 'success' | 'error'>('info');
const snackbarTimerColor = ref<'blue' | 'yellow' | 'green' | 'red'>('blue');

function showSnackbar(type: 'info' | 'warning' | 'success' | 'error', timerColor: 'blue' | 'yellow' | 'green' | 'red', message: string = '') {
  snackbarType.value = type;
  snackbarTimerColor.value = timerColor;
  snackbarMessage.value = message || (type === 'success' ? 'Operação realizada com sucesso.' : 'Erro ao realizar operação.');
  snackbarToast.value = true;
}

async function remove(resident: ResidentDto) {
  try {
    loading.value = true;
    await axios.delete(`/resident/${resident.id}`);
    useResidentStore().deleteResident(resident);
    showSnackbar('success', 'green', 'Morador deletado com sucesso.');
  } catch (err) {
    console.error(err);
    showSnackbar('error', 'red', 'Erro ao deletar morador.');
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
  <v-snackbar
    v-model="snackbarToast"
    :timeout="3000"
    :color="snackbarType"
    location="top right"
    :timer="`${snackbarTimerColor}-darken-2`"
  >
    {{ snackbarMessage }}
  </v-snackbar>
</template>