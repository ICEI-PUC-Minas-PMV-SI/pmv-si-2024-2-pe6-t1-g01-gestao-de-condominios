<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import type VisitorsForm from '@/interfaces/visitors/visitorsForm';
import axios from '@/services/axiosInstace';
import { useVisitorsStore } from '@/stores/visitor'
import type VisitorDto from '@/interfaces/visitors/visitorsDto';
import type ApartmentDto from '@/interfaces/apartment/apartmentDto';

const props = defineProps<{
  showModal: boolean,
  mode: 'view' | 'update' | 'create' | null
}>();
const emit = defineEmits<{ (e: 'close'): void }>();

const visitor = ref<VisitorsForm>({
  id: null,
  name: null,
  cellphone: null,
  cpf: null,
  visits: null,
  createdAt: null,
  updatedAt: null
});
const apartments = ref<ApartmentDto[]>([]);

const snackbarMessage = ref<string>('');
const snackbarToast = ref<boolean>(false);
const snackbarType = ref<'info' | 'warning' | 'success' | 'error'>('info');
const snackbarTimerColor = ref<'blue' | 'yellow' | 'green' | 'red'>('blue');

watch(() => props.mode, (newMode) => {
  if (newMode === 'create') {
    useVisitorsStore().resetVisitor();
  } else if (newMode === 'update') {
    visitor.value = useVisitorsStore().visitor;
  } else if (newMode === 'view') {
    visitor.value = useVisitorsStore().visitor;
  }
});

const visible = ref(false);
const loading = ref(false);

const title = computed(() => {
  switch (props.mode) {
    case 'create': return 'Novo Visitante';
    case 'update': return 'Atualizar Visitante';
    case 'view': return 'Visualizar Visitante';
  }
})

function close() {
    useVisitorsStore().resetVisitor();
    visitor.value = useVisitorsStore().visitor;
    emit('close');
}

function showSnackbar(type: 'info' | 'warning' | 'success' | 'error', timerColor: 'blue' | 'yellow' | 'green' | 'red', message: string = '') {
  snackbarType.value = type;
  snackbarTimerColor.value = timerColor;
  snackbarMessage.value = message || (type === 'success' ? 'Operação realizada com sucesso.' : 'Erro ao realizar operação.');
  snackbarToast.value = true;
}

async function save() {
  if(props.mode === 'view' || !props.mode) return;

  try {
    loading.value = true
    const id = visitor.value.id;
    const message = !id ? 'Morador cadastrado com sucesso.' : 'Morador atualizado com sucesso.';
    const { data }: { data: VisitorDto } = !id
      ? await axios.post('/visitor', visitor.value)
      : await axios.put(`/visitor/${id}`, visitor.value);

    if(!id) useVisitorsStore().addVisitor(data);
    else useVisitorsStore().updateVisitor(data);

    close();
    showSnackbar('success', 'green', message);
  } catch (err) {
    console.error(err);
    showSnackbar('error', 'red', 'Erro ao cadastrar morador.');
  } finally {
    loading.value = false;
  }
}
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
          <v-row>
            <v-col cols="12" md="6" sm="12">
              <div class="text-subtitle-1 text-medium-emphasis">Nome</div>
              <v-text-field
                v-model="visitor.name"
                density="compact"
                placeholder="Seu nome"
                prepend-inner-icon="mdi-account-outline"
                variant="outlined"
                :disabled="props.mode === 'view'"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6" sm="12">
              <div class="text-subtitle-1 text-medium-emphasis">Telefone</div>
              <v-text-field
                v-model="visitor.cellphone"
                density="compact"
                placeholder="Seu telefone"
                prepend-inner-icon="mdi-phone-outline"
                variant="outlined"
                :disabled="props.mode === 'view'"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6" sm="12">
              <div class="text-subtitle-1 text-medium-emphasis">CPF</div>
              <v-text-field
                v-model="visitor.cpf"
                density="compact"
                placeholder="Seu CPF"
                prepend-inner-icon="mdi-card-account-details-outline"
                variant="outlined"
                :disabled="props.mode === 'view'"
              ></v-text-field>
            </v-col>
          </v-row>
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