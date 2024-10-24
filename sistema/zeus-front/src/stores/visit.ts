import type VisitDto from '@/interfaces/visit/visitDto';
import type VisitState from '@/interfaces/visit/visitState';
import { defineStore } from 'pinia'

export const useVisitStore = defineStore('visit', {
  state: (): VisitState => ({
    visits: [],
    visit: {
      id: null,
      visitorId: null,
      userId: null,
      status: 'PENDING',
      visitedAt: null,
    }
  }),
  actions: {
    setVisits(value: VisitDto[]) {
      this.visits = value;
    },
    setVisit(value: VisitDto) {
      this.visit.id = value.id
      this.visit.visitorId = value.visitor.id
      this.visit.userId = value.resident.id
      this.visit.status = value.status
      this.visit.visitedAt = value.visitedAt
    },
    resetVisit() {
      this.visit = {
        id: null,
        visitorId: null,
        userId: null,
        status: 'PENDING',
        visitedAt: null,
      };
    },
    addVisit(value: VisitDto) {
      this.visits.push(value);
    },
    updateVisit(value: VisitDto) {
      const visit = this.visits.find(x => x.id === value.id);
      if(visit) {
        const index = this.visits.indexOf(visit);
        this.visits.splice(index, 1, value);
      }
    },
    deleteVisit(value: VisitDto) {
      this.visits = this.visits.filter(x => x.id !== value.id)
    }
  }
})
