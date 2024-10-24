<script setup lang="ts">
import { ref } from 'vue';
import type ApartmentDto from '@/interfaces/apartment/apartmentDto';
import ApartmentModal from '@/components/System/apartment/ApartmentModal.vue';
import axios from '@/services/axiosInstace';
import { storeToRefs } from 'pinia';
import { useToastStore } from '@/stores/toast';
import { useApartmentStore } from '@/stores/apartment';

const { apartments } = storeToRefs(useApartmentStore());

const headers = ref([
  { title: 'Número', key: 'number', align: 'start' as const },
  { title: 'Bloco', key: 'block', align: 'start' as const },
  { title: 'Moradores', key: 'residents', align: 'start' as const },
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

function view(apartment: ApartmentDto) {
  useApartmentStore().setApartment(apartment);
  modalMode.value = 'view';
  showModal.value = true;
}

function update(apartment: ApartmentDto) {
  useApartmentStore().setApartment(apartment);
  modalMode.value = 'update';
  showModal.value = true;
}

async function remove(apartment: ApartmentDto) {
  try {
    loading.value = true;
    await axios.delete(`/apartment/${apartment.id}`);
    useApartmentStore().deleteApartment(apartment);
    useToastStore().showToast({
      message: 'Apartamento deletado com sucesso.',
      type: 'success',
      color: 'green'
    });
  } catch (err) {
    console.error(err);
    useToastStore().showToast({
      message: 'Erro ao deletar apartamento.',
      type: 'error',
      color: 'red'
    });
  } finally {
    loading.value = false;
  }
}

function closeModal() {
  showModal.value = false;
  modalMode.value = null;
}

async function getApartments() {
  try {
    loading.value = true;
    const { data }: { data: ApartmentDto[] } = await axios.get('/apartment');
    useApartmentStore().setApartments(data);
  } catch (err) {
    console.error(err);
  } finally {
    loading.value = false;
  }
}

getApartments();
</script>

<template>
  <v-data-table
    :headers="headers"
    :items="apartments"
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
          Novo Apartamento
        </v-btn>
        <ApartmentModal
          :mode="modalMode"
          :showModal="showModal"
          @close="closeModal"
        />

      </v-toolbar>
    </template>
    <template v-slot:loading>
      <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
    </template>
    <template v-slot:item.number="{ value }">
      {{ value }}
    </template>
    <template v-slot:item.block="{ value }">
      {{ value }}
    </template>
    <template v-slot:item.residents="{ value }">
      <v-chip v-for="resident in value" :color="getColor(value.block)">
        {{ resident.name }}
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