import type ApartmentDto from '@/interfaces/apartment/apartmentDto';
import type ApartmentState from '@/interfaces/apartment/apartmentState';
import { defineStore } from 'pinia'

export const useApartmentStore = defineStore('apartment', {
  state: (): ApartmentState => ({
    apartments: [],
    apartment: {
      id: null,
      number: null,
      block: null
    }
  }),
  actions: {
    setApartments(value: ApartmentDto[]) {
      this.apartments = value;
    },
    setApartment(value: ApartmentDto) {
      this.apartment.id = value.id
      this.apartment.number = value.number
      this.apartment.block = value.block
    },
    resetApartment() {
      this.apartment = {
        id: null,
        number: null,
        block: null
      };
    },
    addApartment(value: ApartmentDto) {
      console.log(value)
      this.apartments.unshift(value);
    },
    updateApartment(value: ApartmentDto) {
      const apartment = this.apartments.find(x => x.id === value.id);
      if(apartment) {
        const index = this.apartments.indexOf(apartment);
        this.apartments.splice(index, 1, value);
      }
    },
    deleteApartment(value: ApartmentDto) {
      this.apartments = this.apartments.filter(x => x.id !== value.id)
    }
  }
})
