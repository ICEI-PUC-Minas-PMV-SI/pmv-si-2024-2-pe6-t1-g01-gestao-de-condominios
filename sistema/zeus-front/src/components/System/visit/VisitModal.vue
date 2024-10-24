<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import type VisitForm from '@/interfaces/visit/visitForm';
import axios from '@/services/axiosInstace';
import type VisitDto from '@/interfaces/visit/visitDto';
import { useVisitStore } from '@/stores/visit';
import { useToastStore } from '@/stores/toast';
import type VisitorDto from '@/interfaces/visitors/visitorDto';
import type ResidentDto from '@/interfaces/resident/residentDto';
import type { VisitStatus } from '@/interfaces/visit/visitStatus';
import { useResidentStore } from '@/stores/resident';
import { useVisitorsStore } from '@/stores/visitor';
import { storeToRefs } from 'pinia';
import cellphoneFormatter from '@/utils/cellphoneFormatter'


const props = defineProps<{
  showModal: boolean,
  mode: 'view' | 'update' | 'create' | null
}>();
const emit = defineEmits<{ (e: 'close'): void }>();

const visit = ref<VisitForm>({
  id: null,
  userId: null,
  status: 'PENDING',
  visitorId: null,
  visitedAt: null
});
const { visitors } = storeToRefs(useVisitorsStore());
const { residents } = storeToRefs(useResidentStore());
const statusOptions = ref<{ title: 'APROVADO' | 'DESAPROVADO' | 'PENDENTE'; value: VisitStatus; }[]>([
  { title: 'APROVADO', value: 'APPROVED' },
  { title: 'DESAPROVADO', value: 'DISAPPROVED' },
  { title: 'PENDENTE', value: 'PENDING' }
]);



watch(() => props.mode, (newMode) => {
  if (newMode === 'create') {
    useVisitStore().resetVisit();
  } else if (newMode === 'update') {
    visit.value = useVisitStore().visit;
  } else if (newMode === 'view') {
    visit.value = useVisitStore().visit;
  }
});

const visible = ref(false);
const loading = ref(false);

const title = computed(() => {
  switch (props.mode) {
    case 'create': return 'Novo Morador';
    case 'update': return 'Atualizar Morador';
    case 'view': return 'Visualizar Morador';
  }
})

function close() {
  useVisitStore().resetVisit();
  visit.value = useVisitStore().visit;
  emit('close');
}

async function save() {
  if(props.mode === 'view' || !props.mode) return;

  try {
    loading.value = true
    const id = visit.value.id;
    const message = !id ? 'Visita cadastrado com sucesso.' : 'Visita atualizado com sucesso.';
    const { data }: { data: VisitDto } = !id
      ? await axios.post('/visit', visit.value)
      : await axios.put(`/visit/${id}`, visit.value);

    if(!id) useVisitStore().addVisit(data);
    else useVisitStore().updateVisit(data);

    close();
    useToastStore().showToast({message, type: 'success', color: 'green'});
  } catch (err) {
    console.error(err);
    useToastStore().showToast({message: 'Erro ao cadastrar morador.', type: 'error', color: 'red'});
  } finally {
    loading.value = false;
  }
}

const menu = ref(false);
const date = ref<Date | string | null>(null);
const time = ref<string | null>(null);

const dateTimeFormatted = computed(() => {
  if(visit.value.id && visit.value.visitedAt) {
    const dateObjectEdit = new Date(visit.value.visitedAt);
    const hour = dateObjectEdit.getHours();
    const minutes = dateObjectEdit.getMinutes();

    date.value = dateObjectEdit;
    time.value = `${hour}:${minutes}`;
  }

  if (date.value && time.value) {
    const dateObject = new Date(date.value);
    dateObject.setHours(Number(time.value.substr(0, 2)), Number(time.value.substr(3, 2)))
    const day = String(dateObject.getDate()).padStart(2, '0');
    const month = String(dateObject.getMonth() + 1).padStart(2, '0');
    const year = dateObject.getFullYear();
    const hour = dateObject.getHours();
    const minutes = dateObject.getMinutes();
    visit.value.visitedAt = dateObject;

    return `${day}/${month}/${year} ${hour}:${minutes}`;
  } else {
    return '';
  }
});

const updateDateTime = () => {
  console.log(date.value, time.value)
};

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

getResidents();
getVisitors();
</script>

<template>
  <v-dialog
    v-model="props.showModal"
    max-width="550px"
  >
    <v-card :loading="loading">
      <v-card-title>
        <span class="text-h5">{{ title }}</span>
      </v-card-title>

      <v-card-text>
        <v-container>
          <div>
            <div class="text-subtitle-1 text-medium-emphasis">Visitante</div>
            <v-select
              v-model="visit.visitorId"
              :items="visitors"
              placeholder="Selecione"
              variant="outlined"
              item-title="name"
              item-value="id"
              density="compact"
              :disabled="props.mode === 'view'"
            >
              <template v-slot:item="{ props, item }">
                <v-list-item v-bind="props" :subtitle="cellphoneFormatter(item.raw.cellphone) || ''"/>
              </template>
            </v-select>
          </div>
          <div>
            <div class="text-subtitle-1 text-medium-emphasis">Morador</div>
            <v-select
              v-model="visit.userId"
              :items="residents"
              placeholder="Selecione"
              variant="outlined"
              item-title="name"
              item-value="id"
              density="compact"
              :disabled="props.mode === 'view'"
            >
              <template v-slot:item="{ props, item }">
                <v-list-item v-bind="props" :subtitle="cellphoneFormatter(item.raw.cellphone) || ''"/>
              </template>
            </v-select>
          </div>
          <div>
            <div class="text-subtitle-1 text-medium-emphasis">Status</div>
            <v-select
              v-model="visit.status"
              :items="statusOptions"
              placeholder="Selecione"
              variant="outlined"
              item-title="title"
              item-value="value"
              density="compact"
              :disabled="props.mode === 'view'"
            ></v-select>
          </div>
          <div>
            <v-menu
              v-model="menu"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="auto"
            >
              <template v-slot:activator="{ isActive, props }">
                <div class="text-subtitle-1 text-medium-emphasis">Data e Hora da Visita</div>
                <v-text-field
                  v-model="dateTimeFormatted"
                  label="Escolha a data e hora"
                  readonly
                  v-bind="props"
                  :active="isActive"
                  variant="outlined"
                  density="compact"
                ></v-text-field>
              </template>

              <v-card>
                <v-date-picker
                  v-model="date"
                  hide-header
                  @input="updateDateTime"
                ></v-date-picker>
                <v-time-picker
                  v-model="time"
                  @input="updateDateTime"
                  format="24hr"
                ></v-time-picker>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn text="true" color="primary" @click="menu = false">OK</v-btn>
                </v-card-actions>
              </v-card>
            </v-menu>
          </div>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="blue-darken-1"
          variant="text"
          @click="close"
        >
          Cancel
        </v-btn>
        <v-btn
          color="blue-darken-1"
          variant="text"
          @click="save"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>