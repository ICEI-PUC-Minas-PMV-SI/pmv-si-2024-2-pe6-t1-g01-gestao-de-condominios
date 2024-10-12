import type ResidentDto from '@/interfaces/resident/residentDto';
import type ResidentForm from '@/interfaces/resident/residentForm';
import type ResidentState from '@/interfaces/resident/residentState';
import { defineStore } from 'pinia'

export const useResidentStore = defineStore('resident', {
  state: (): ResidentState => ({
    residents: [],
    resident: {
      id: null,
      name: null,
      email: null,
      password: null,
      cellphone: null,
      cpf: null,
      role: 'MORADOR',
      apartmentId: null
    }
  }),
  actions: {
    setResidents(value: ResidentDto[]) {
      this.residents = value;
    },
    setResident(value: ResidentForm) {
      this.resident = value;
    },
    resetResident() {
      this.resident = {
        id: null,
        name: null,
        email: null,
        password: null,
        cellphone: null,
        cpf: null,
        role: 'MORADOR',
        apartmentId: null
      };
    },
    addResident(value: ResidentDto) {
      this.residents.push(value);
    }
  }
})
