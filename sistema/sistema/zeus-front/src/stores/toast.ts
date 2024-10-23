import { defineStore } from 'pinia'

type ToastTypes = 'info' | 'warning' | 'success' | 'error'
type ToastColors = 'blue' | 'yellow' | 'green' | 'red'

interface Toast {
  message: string,
  activate: boolean,
  type: ToastTypes,
  color: ToastColors
}

export const useToastStore = defineStore('toast', {
  state: (): Toast => ({
    message: '',
    activate: false,
    type: 'info',
    color: 'blue'
  }),
  actions: {
    showToast({ message, type, color }: {
      message: string,
      type: ToastTypes,
      color: ToastColors
    }) {
      this.message = message || (
        type === 'success'
          ? 'Operação realizada com sucesso.'
          : 'Erro ao realizar operação.'
      );
      this.type = type;
      this.color = color;
      this.activate = true;
    }
  }
})
