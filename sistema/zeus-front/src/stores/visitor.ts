import type VisitorDto from '@/interfaces/visitors/visitorDto';
import type visitorsForm from '@/interfaces/visitors/visitorsForm';
import type visitorsState from '@/interfaces/visitors/visitorsState';
import { defineStore } from 'pinia'

export const useVisitorsStore = defineStore('visitor', {
  state: (): visitorsState => ({
    visitors: [],
    visitor: {
      id: null,
      name: null,
      cellphone: null,
      cpf: null,
      visits: [],
      createdAt: null,
      updatedAt: null,
    }
  }),
  actions: {
    setVisitors(value: VisitorDto[]) {
      this.visitors = value;
    },
    setVisitor(value: VisitorDto) {
      this.visitor.id = value.id
      this.visitor.name = value.name
      this.visitor.cellphone = value.cellphone
      this.visitor.cpf = value.cpf
      this.visitor.createdAt = value.createdAt
      this.visitor.updatedAt = value.updatedAt
    },
    resetVisitor() {
      this.visitor = {
        id: null,
        name: null,
        cellphone: null,
        cpf: null,
        visits: [],
        createdAt: null,
        updatedAt: null,
      };
    },
    addVisitor(value: VisitorDto) {
      this.visitors.push(value);  
    },
    updateVisitor(value: VisitorDto) {
      const visitor = this.visitors.find(x => x.id === value.id);
      if(visitor) {
        const index = this.visitors.indexOf(visitor);
        this.visitors.splice(index, 1, value);
      }
    },
    deleteVisitor(value: VisitorDto) {
      this.visitors = this.visitors.filter(x => x.id !== value.id)
    }
  }
})
