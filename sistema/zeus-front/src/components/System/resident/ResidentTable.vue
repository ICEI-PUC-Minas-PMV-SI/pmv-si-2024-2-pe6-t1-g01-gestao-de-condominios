<script setup lang="ts">
import { ref } from 'vue';
import cellphoneFormatter from '@/utils/cellphoneFormatter'
import type ResidentDto from '@/interfaces/resident/residentDto';
import ResidentModal from './ResidentModal.vue';

const headers = ref([
  { title: 'Nome', key: 'name', align: 'start' as const },
  { title: 'E-mail', key: 'email', align: 'start' as const },
  { title: 'CPF', key: 'cpf', align: 'start' as const },
  { title: 'Apto/Bloco', key: 'apartment', align: 'start' as const },
  { title: 'Ações', key: 'actions', sortable: false, align: 'end' as const },
]);

const residents = ref<ResidentDto[]>([]);

const loading = ref(false);
const showModal = ref(false);
const search = ref<string | null>();

function getColor(value: string) {
  if(value === 'A') return 'green-darken-4'
  else return 'orange-darken-4'
}
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
          @click="showModal = true"
        >
          <v-icon icon="mdi-plus" />
          Novo Morador
        </v-btn>
        <ResidentModal :showModal="showModal" @close="showModal = false" />

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
      <v-chip :color="getColor(value.block)">
        {{ value.number }} / {{ value.block }}
      </v-chip>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        class="me-2"
        size="small"
        color="blue-darken-1"
      >
        mdi-eye
      </v-icon>
      <v-icon
        class="me-2"
        size="small"
        color="yellow-darken-3"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        size="small"
        color="red-darken-2"
      >
        mdi-delete
      </v-icon>
    </template>
  </v-data-table>
</template>