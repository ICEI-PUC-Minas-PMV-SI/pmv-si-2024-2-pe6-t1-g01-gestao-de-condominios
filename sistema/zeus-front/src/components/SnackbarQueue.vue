<script setup lang="ts">
import { ref } from 'vue';

interface Snackbar {
  message: string;
  color: string;
  visible: boolean;
}

const snackbarQueue = ref<Snackbar[]>([]);
const snackbarTimeout = 3000;

function showSnackbar(message: string, color: string = 'success') {
  const newSnackbar: Snackbar = { message, color, visible: true };
  snackbarQueue.value.push(newSnackbar);
}

function handleSnackbarClose(index: number) {
  snackbarQueue.value[index].visible = false;
  setTimeout(() => {
    snackbarQueue.value.splice(index, 1);
  }, 300);
}

defineExpose({ showSnackbar });
</script>

<template>
  <v-snackbar-queue
    v-model="snackbarQueue"
    :timeout="snackbarTimeout"
    location="top right"
  >
    <template v-for="(snackbar, index) in snackbarQueue" :key="index">
      <v-snackbar
        v-model="snackbar.visible"
        :color="snackbar.color"
        :timeout="snackbarTimeout"
        @close="handleSnackbarClose(index)"
      >
        {{ snackbar.message }}
      </v-snackbar>
    </template>
  </v-snackbar-queue>
</template>
