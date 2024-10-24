<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import type ApartmentForm from '@/interfaces/apartment/apartmentForm';
import axios from '@/services/axiosInstace';
import { useApartmentStore } from '@/stores/apartment'
import type ApartmentDto from '@/interfaces/apartment/apartmentDto';
import { useToastStore } from '@/stores/toast';

const props = defineProps<{
  showModal: boolean,
  mode: 'view' | 'update' | 'create' | null
}>();
const emit = defineEmits<{ (e: 'close'): void }>();

const apartment = ref<ApartmentForm>({
  id: null,
  number: null,
  block: null
});

watch(() => props.mode, (newMode) => {
  if (newMode === 'create') {
    useApartmentStore().resetApartment();
  } else if (newMode === 'update') {
    apartment.value = useApartmentStore().apartment;
  } else if (newMode === 'view') {
    apartment.value = useApartmentStore().apartment;
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
  useApartmentStore().resetApartment();
  apartment.value = useApartmentStore().apartment;
  emit('close');
}

async function save() {
  if(props.mode === 'view' || !props.mode) return;

  try {
    loading.value = true
    const id = apartment.value.id;
    const message = !id ? 'Apartamento cadastrado com sucesso.' : 'Apartamento atualizado com sucesso.';
    const { data }: { data: ApartmentDto } = !id
      ? await axios.post('/apartment', {...apartment.value, number: Number(apartment.value.number)})
      : await axios.put(`/apartment/${id}`, {...apartment.value, number: Number(apartment.value.number)});

    if(!id) useApartmentStore().addApartment({...data, residents: []});
    else useApartmentStore().updateApartment(data);

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
        <div>
          <div class="text-subtitle-1 text-medium-emphasis">Número</div>
          <v-text-field
            v-model="apartment.number"
            type="number"
            density="compact"
            placeholder="Número do apartamento"
            variant="outlined"
            :disabled="props.mode === 'view'"
          ></v-text-field>
        </div>
        <div>
          <div class="text-subtitle-1 text-medium-emphasis">Bloco</div>
          <v-text-field
            v-model="apartment.block"
            density="compact"
            placeholder="Bloco do apartamento (opcional)"
            variant="outlined"
            :disabled="props.mode === 'view'"
          ></v-text-field>
        </div>
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
