<script setup lang="ts">
import { ref } from 'vue';
import cellphoneFormatter from '@/utils/cellphoneFormatter'

const headers = ref([
  { title: 'Nome', key: 'name' },
  { title: 'E-mail', key: 'email' },
  { title: 'CPF', key: 'cpf' },
  { title: 'Apto/Bloco', key: 'apartment' },
  { title: 'Actions', key: 'actions', sortable: false, align: 'end' },
]);
const vegetables = ref([
  {
    name: 'Spinach',
    email: 23,
    cellphone: "31998136678",
    cpf: 0.4,
    apartment: {
      number: 101,
      block: "A"
    }
  },
  {
    name: 'Kael',
    email: 49,
    cellphone: "31998136678",
    cpf: 0.9,
    apartment: {
      number: 101,
      block: "B"
    }
  },
  {
    name: 'Broccoli',
    email: 34,
    cellphone: "31998136678",
    cpf: 0.4,
    apartment: {
      number: 101,
      block: "A"
    }
  },
  {
    name: 'Brussels Sprouts',
    email: 43,
    cellphone: "31998136678",
    cpf: 0.3,
    apartment: {
      number: 101,
      block: "A"
    }
  },
  {
    name: 'Avocado',
    email: 160,
    cellphone: "31998136678",
    cpf: 15,
    apartment: {
      number: 101,
      block: "A"
    }
  },
  {
    name: 'Sweet Potato',
    email: 86,
    cellphone: "31998136678",
    cpf: 0.1,
    apartment: {
      number: 101,
      block: "A"
    }
  },
  {
    name: 'Corn',
    email: 96,
    cellphone: "31998136678",
    cpf: 1.5,
    apartment: {
      number: 101,
      block: "A"
    }
  },
  {
    name: 'Potato',
    email: 77,
    cellphone: "31998136678",
    cpf: 0.1,
    apartment: {
      number: 101,
      block: "A"
    }
  },
  {
    name: 'Butternut Squash',
    email: 45,
    cellphone: "31998136678",
    cpf: 0.1,
    apartment: {
      number: 101,
      block: "A"
    }
  },
  {
    name: 'Beetroot',
    email: 43,
    cellphone: "31998136678",
    cpf: 0.2,
    apartment: {
      number: 101,
      block: "A"
    }
  },
  {
    name: 'Parsnip',
    email: 75,
    cellphone: "31998136678",
    cpf: 0.3,
    apartment: {
      number: 101,
      block: "A"
    }
  },
  {
    name: 'Yam',
    email: 118,
    cellphone: "31998136678",
    cpf: 0.2,
    apartment: {
      number: 101,
      block: "A"
    }
  },
  {
    name: 'Acorn Squash',
    email: 40,
    cellphone: "31998136678",
    cpf: 0.1,
    apartment: {
      number: 101,
      block: "A"
    }
  },
  {
    name: 'Artichoke',
    email: 47,
    cellphone: "31998136678",
    cpf: 0.2,
    apartment: {
      number: 101,
      block: "A"
    }
  },
  {
    name: 'Peas',
    email: 81,
    cellphone: "31998136678",
    cpf: 0.4,
    apartment: {
      number: 101,
      block: "A"
    }
  },
  {
    name: 'Green Beans',
    email: 31,
    cellphone: "31998136678",
    cpf: 0.1,
    apartment: {
      number: 101,
      block: "A"
    }
  },
  {
    name: 'Red Bell Pepper',
    email: 26,
    cellphone: "31998136678",
    cpf: 0.2,
    apartment: {
      number: 101,
      block: "A"
    }
  },
  {
    name: 'Cauliflower',
    email: 25,
    cellphone: "31998136678",
    cpf: 0.1,
    apartment: {
      number: 101,
      block: "A"
    }
  },
  {
    name: 'Zucchini',
    email: 17,
    cellphone: "31998136678",
    cpf: 0.3,
    apartment: {
      number: 101,
      block: "A"
    }
  },
  {
    name: 'Asparagus',
    email: 20,
    cellphone: "31998136678",
    cpf: 0.1,
    apartment: {
      number: 101,
      block: "A"
    }
  },
  {
    name: 'Eggplant',
    email: 25,
    cellphone: "31998136678",
    cpf: 0.2,
    apartment: {
      number: 101,
      block: "A"
    }
  },
  {
    name: 'Pumpkin',
    email: 26,
    cellphone: "31998136678",
    cpf: 0.1,
    apartment: 6.5,
  },
  {
    name: 'Celery',
    email: 16,
    cellphone: "31998136678",
    cpf: 0.2,
    apartment: {
      number: 101,
      block: "A"
    }
  },
  {
    name: 'Cucumber',
    email: 15,
    cellphone: "31998136678",
    cpf: 0.1,
    apartment: {
      number: 101,
      block: "A"
    }
  },
  {
    name: 'Leek',
    email: 61,
    cellphone: "31998136678",
    cpf: 0.3,
    apartment: {
      number: 101,
      block: "A"
    }
  },
  {
    name: 'Fennel',
    email: 31,
    cellphone: "31998136678",
    cpf: 0.2,
    apartment: {
      number: 101,
      block: "A"
    }
  },
  {
    name: 'Green Peas',
    email: 81,
    cellphone: "31998136678",
    cpf: 0.4,
    apartment: {
      number: 101,
      block: "A"
    }
  },
  {
    name: 'Okra',
    email: 33,
    cellphone: "31998136678",
    cpf: 0.2,
    apartment: {
      number: 101,
      block: "A"
    }
  },
  {
    name: 'Chard',
    email: 19,
    cellphone: "31998136678",
    cpf: 0.2,
    apartment: {
      number: 101,
      block: "A"
    }
  },
  {
    name: 'Collard Greens',
    email: 32,
    cellphone: "31998136678",
    cpf: 0.6,
    apartment: {
      number: 101,
      block: "A"
    }
  }
]);
function getColor(value: string) {
  if(value === 'A') return 'green-darken-4'
  else return 'orange-darken-4'
}
</script>

<template>
  <v-container>
    <v-card
      class="mr-3 pa-5"
      max-width="1100"
    >
      <v-data-table
        :headers="headers"
        :items="vegetables"
      >
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
    </v-card>
  </v-container>
</template>

<style scoped>
.custom-margin {
  margin-top: 0px;
}
</style>