import type ResidentDto from '@/interfaces/resident/residentDto';
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
    setResident(value: ResidentDto) {
      this.resident.id = value.id
      this.resident.name = value.name
      this.resident.email = value.email
      this.resident.password = null
      this.resident.cellphone = value.cellphone
      this.resident.cpf = value.cpf
      this.resident.role = 'MORADOR'
      this.resident.apartmentId = value.apartment ? value.apartment.id : null
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
    },
    updateResident(value: ResidentDto) {
      const resident = this.residents.find(x => x.id === value.id);
      if(resident) {
        const index = this.residents.indexOf(resident);
        this.residents.splice(index, 1, value);
      }
    },
    deleteResident(value: ResidentDto) {
      this.residents = this.residents.filter(x => x.id !== value.id)
    }
  }
})
