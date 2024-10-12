<script setup lang="ts">
import { ref } from 'vue';
import type ResidentForm from '@/interfaces/resident/residentForm';
import axios from '@/services/axiosInstace';
import { useResidentStore } from '@/stores/resident'
import type ResidentDto from '@/interfaces/resident/residentDto';
import type ApartmentDto from '@/interfaces/apartment/apartmentDto';

const props = defineProps<{ showModal: boolean }>();
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

const visible = ref(false)
const loading = ref(false);

function close() {
  useResidentStore().resetResident();
  emit('close');
}

async function save() {
  try {
    loading.value = true
    const { data }: { data: ResidentDto } = await axios.post('/resident', resident.value);
    useResidentStore().addResident(data)
    close()
  } catch (err) {
    console.error(err)
  } finally {
    loading.value = false
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
        <span class="text-h5">Novo Morador</span>
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
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="12" sm="12">
              <div class="text-subtitle-1 text-medium-emphasis">Apartamento</div>
              <v-select
                label="Selecione"
                :items="apartments"
                variant="outlined"
                item-title="number"
                item-value="id"
                density="compact"
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