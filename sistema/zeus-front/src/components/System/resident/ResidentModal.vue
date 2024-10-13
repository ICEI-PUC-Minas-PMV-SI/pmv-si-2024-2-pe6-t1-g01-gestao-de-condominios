<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import type ResidentForm from '@/interfaces/resident/residentForm';
import axios from '@/services/axiosInstace';
import { useResidentStore } from '@/stores/resident'
import type ResidentDto from '@/interfaces/resident/residentDto';
import type ApartmentDto from '@/interfaces/apartment/apartmentDto';

const props = defineProps<{
  showModal: boolean,
  mode: 'view' | 'update' | 'create' | null
}>();
const emit = defineEmits<{ (e: 'close'): void }>();

const resident = ref<ResidentForm>({
  id: null,
  name: null,
  email: null,
  password: null,
  cellphone: null,
  cpf: null,
  role: 'MORADOR',
  apartmentId: null
});
const apartments = ref<ApartmentDto[]>([]);

const snackbarMessage = ref<string>('');
const snackbarToast = ref<boolean>(false);
const snackbarType = ref<'info' | 'warning' | 'success' | 'error'>('info');
const snackbarTimerColor = ref<'blue' | 'yellow' | 'green' | 'red'>('blue');

watch(() => props.mode, (newMode) => {
  if (newMode === 'create') {
    useResidentStore().resetResident();
  } else if (newMode === 'update') {
    resident.value = useResidentStore().resident;
  } else if (newMode === 'view') {
    resident.value = useResidentStore().resident;
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
  useResidentStore().resetResident();
  resident.value = useResidentStore().resident;
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
    const id = resident.value.id;
    const message = !id ? 'Morador cadastrado com sucesso.' : 'Morador atualizado com sucesso.';
    const { data }: { data: ResidentDto } = !id
      ? await axios.post('/resident', resident.value)
      : await axios.put(`/resident/${id}`, resident.value);

    if(!id) useResidentStore().addResident(data);
    else useResidentStore().updateResident(data);

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
                v-model="resident.name"
                density="compact"
                placeholder="Seu nome"
                prepend-inner-icon="mdi-account-outline"
                variant="outlined"
                :disabled="props.mode === 'view'"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6" sm="12">
              <div class="text-subtitle-1 text-medium-emphasis">E-mail</div>
              <v-text-field
                v-model="resident.email"
                density="compact"
                placeholder="Endereço de E-mail"
                prepend-inner-icon="mdi-email-outline"
                variant="outlined"
                :disabled="props.mode === 'view'"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6" sm="12">
              <div class="text-subtitle-1 text-medium-emphasis">Telefone</div>
              <v-text-field
                v-model="resident.cellphone"
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
                v-model="resident.cpf"
                density="compact"
                placeholder="Seu CPF"
                prepend-inner-icon="mdi-card-account-details-outline"
                variant="outlined"
                :disabled="props.mode === 'view'"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="12" sm="12">
              <div class="text-subtitle-1 text-medium-emphasis">Apartamento</div>
              <v-select
                :items="apartments"
                placeholder="Selecione"
                variant="outlined"
                item-title="number"
                item-value="id"
                density="compact"
                :disabled="props.mode === 'view'"
              >
                <template v-slot:item="{ props, item }">
                  <v-list-item v-bind="props" :subtitle="item.raw.block || ''"/>
                </template>
              </v-select>
            </v-col>
            <v-col cols="12" md="12" sm="12">
              <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
                Senha
              </div>
              <v-text-field
                v-model="resident.password"
                :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                :type="visible ? 'text' : 'password'"
                density="compact"
                placeholder="Insira sua senha"
                prepend-inner-icon="mdi-lock-outline"
                variant="outlined"
                :disabled="props.mode === 'view'"
                @click:append-inner="visible = !visible"
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