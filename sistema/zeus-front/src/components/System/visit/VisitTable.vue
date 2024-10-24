<script setup lang="ts">
import { ref } from 'vue';
import cellphoneFormatter from '@/utils/cellphoneFormatter'
import type VisitDto from '@/interfaces/visit/visitDto';
import VisitModal from './VisitModal.vue';
import axios from '@/services/axiosInstace';
import { storeToRefs } from 'pinia';
import { useToastStore } from '@/stores/toast';
import { useVisitStore } from '@/stores/visit';
import dateTimeFormatter from '@/utils/dateTimeFormatter';

const { visits } = storeToRefs(useVisitStore());

const headers = ref([
  { title: 'Visitante', key: 'visitor', align: 'start' as const },
  { title: 'Morador', key: 'resident', align: 'start' as const },
  { title: 'Apto/Bloco', key: 'apartment', align: 'start' as const },
  { title: 'Status', key: 'status', align: 'start' as const },
  { title: 'Data da Visita', key: 'visitedAt', align: 'start' as const },
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

function getColorStatus(value: string) {
  if(value === 'APPROVED') return 'green-darken-4'
  else if(value === 'DISAPPROVED') return 'red-darken-4'
  else return 'yellow-darken-4'
}

function create() {
  modalMode.value = 'create';
  showModal.value = true
}

function view(visit: VisitDto) {
  useVisitStore().setVisit(visit);
  modalMode.value = 'view';
  showModal.value = true;
}

function update(visit: VisitDto) {
  useVisitStore().setVisit(visit);
  modalMode.value = 'update';
  showModal.value = true;
}

async function remove(visit: VisitDto) {
  try {
    loading.value = true;
    await axios.delete(`/visit/${visit.id}`);
    useVisitStore().deleteVisit(visit);
    useToastStore().showToast({message: 'Visita deletado com sucesso.', type: 'success', color: 'green'});
  } catch (err) {
    console.error(err);
    useToastStore().showToast({message: 'Erro ao deletar visita.', type: 'error', color: 'red'});
  } finally {
    loading.value = false;
  }
}

function closeModal() {
  showModal.value = false;
  modalMode.value = null;
}

async function getVisits() {
  try {
    loading.value = true;
    const { data }: { data: VisitDto[] } = await axios.get('/visit');
    useVisitStore().setVisits(data);
  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
}

getVisits();
</script>

<template>
  <v-data-table
    :headers="headers"
    :items="visits"
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
          Nova Visita
        </v-btn>
        <VisitModal
          :mode="modalMode"
          :showModal="showModal"
          @close="closeModal"
        />

      </v-toolbar>
    </template>
    <template v-slot:loading>
      <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
    </template>
    <template v-slot:item.visitor="{ item }">
      {{ item.visitor.name }} <br>
      <small>{{ cellphoneFormatter(item.visitor.cellphone) }}</small>
    </template>
    <template v-slot:item.resident="{ item }">
      {{ item.resident.name }} <br>
      <small>{{ cellphoneFormatter(item.resident.cellphone) }}</small>
    </template>
    <template v-slot:item.apartment="{ item }">
      <v-chip v-if="item.resident.apartment" :color="getColor(item.resident.apartment.block)">
        {{ item.resident.apartment.number }} / {{ item.resident.apartment.block }}
      </v-chip>
    </template>
    <template v-slot:item.status="{ value }">
      <v-chip v-if="value" :color="getColorStatus(value)">
        {{ value }}
      </v-chip>
    </template>
    <template v-slot:item.visitedAt="{ value }">
      {{ dateTimeFormatter(value) }}
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