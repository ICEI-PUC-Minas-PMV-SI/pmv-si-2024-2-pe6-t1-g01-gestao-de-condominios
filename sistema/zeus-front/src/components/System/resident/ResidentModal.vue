<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import type ResidentForm from '@/interfaces/resident/residentForm';
import axios from '@/services/axiosInstace';
import { useResidentStore } from '@/stores/resident'
import type ResidentDto from '@/interfaces/resident/residentDto';
import type ApartmentDto from '@/interfaces/apartment/apartmentDto';
import { useToastStore } from '@/stores/toast';
import { useApartmentStore } from '@/stores/apartment';
import { storeToRefs } from 'pinia';

const { apartments } = storeToRefs(useApartmentStore());

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
    useToastStore().showToast({message, type: 'success', color: 'green'});
  } catch (err) {
    console.error(err);
    useToastStore().showToast({message: 'Erro ao cadastrar morador.', type: 'error', color: 'red'});
  } finally {
    loading.value = false;
  }
}

function apartmentProps(apartment: ApartmentDto) {
  return {
    title: 'Número: ' + apartment.number,
    subtitle: 'Bloco: ' + apartment.block,
  }
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
            <v-col class="py-0" cols="12" md="6" sm="12">
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
            <v-col class="py-0" cols="12" md="6" sm="12">
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
            <v-col class="py-0" cols="12" md="6" sm="12">
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
            <v-col class="py-0" cols="12" md="6" sm="12">
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
            <v-col class="py-0" cols="12" md="12" sm="12">
              <div class="text-subtitle-1 text-medium-emphasis">Apartamento</div>
              <v-select
                v-model="resident.apartmentId"
                :items="apartments"
                placeholder="Selecione"
                variant="outlined"
                item-title="number"
                item-value="id"
                :item-props="apartmentProps"
                density="compact"
                :disabled="props.mode === 'view'"
              ></v-select>
            </v-col>
            <v-col class="py-0" cols="12" md="12" sm="12">
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
</template>