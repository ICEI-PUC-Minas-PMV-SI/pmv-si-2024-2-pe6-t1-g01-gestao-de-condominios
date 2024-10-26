<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import type ResidentForm from '@/interfaces/employee/employeeForm';
import axios from '@/services/axiosInstace';
import { useEmployeeStore } from '@/stores/employee'
import type ResidentDto from '@/interfaces/employee/employeeDto';
import { useToastStore } from '@/stores/toast';

const props = defineProps<{
  showModal: boolean,
  mode: 'view' | 'update' | 'create' | null
}>();

const emit = defineEmits<{ (e: 'close'): void }>();

const employee = ref<ResidentForm>({
  id: null,
  name: null,
  email: null,
  password: null,
  cellphone: null,
  cpf: null,
  role: 'PORTEIRO',
});

watch(() => props.mode, (newMode) => {
  if (newMode === 'create') {
    useEmployeeStore().resetEmployee();
  } else if (newMode === 'update') {
    employee.value = useEmployeeStore().employee;
  } else if (newMode === 'view') {
    employee.value = useEmployeeStore().employee;
  }
});

const visible = ref(false);
const loading = ref(false);

const title = computed(() => {
  switch (props.mode) {
    case 'create': return 'Novo Funcionário';
    case 'update': return 'Atualizar Funcionário';
    case 'view': return 'Visualizar Funcionário';
  }
})

function close() {
  useEmployeeStore().resetEmployee();
  employee.value = useEmployeeStore().employee;
  emit('close');
}

async function save() {
  if(props.mode === 'view' || !props.mode) return;
  try {
    loading.value = true
    const id = employee.value.id;
    const message = !id ? 'Funcionário cadastrado com sucesso.' : 'Funcionário atualizado com sucesso.';
    const { data }: { data: ResidentDto } = !id
      ? await axios.post('/employee', employee.value)
      : await axios.put(`/employee/${id}`, employee.value);
    if(!id) useEmployeeStore().addEmployee(data);
    else useEmployeeStore().updateEmployee(data);
    close();
    useToastStore().showToast({message, type: 'success', color: 'green'});
  } catch (err) {
    console.error(err);
    useToastStore().showToast({message: 'Erro ao cadastrar morador.', type: 'error', color: 'red'});
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
                v-model="employee.name"
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
                v-model="employee.email"
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
                v-model="employee.cellphone"
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
                v-model="employee.cpf"
                density="compact"
                placeholder="Seu CPF"
                prepend-inner-icon="mdi-card-account-details-outline"
                variant="outlined"
                :disabled="props.mode === 'view'"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="12" sm="12">
              <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
                Senha
              </div>
              <v-text-field
                v-model="employee.password"
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
          Cancelar
        </v-btn>
        <v-btn
          color="blue-darken-1"
          variant="text"
          @click="save"
        >
          Salvar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>