import type DocumentDto from '@/interfaces/document/documentDto'
import type DocumentState from '@/interfaces/document/documentState'
import { defineStore } from 'pinia'

export const useDocumentStore = defineStore('document', {
  state: (): DocumentState => ({
    document: {
      title: null,
      description: null,
      file: null,
    },
    documents: []
  }),
  actions: {
    setDocuments(value: DocumentDto[]) {
      this.documents = value
    },
    addDocument(value: DocumentDto) {
      this.documents.unshift(value);
    },
    updateDocument({ oldValue, newValue }: { oldValue: DocumentDto, newValue: DocumentDto }) {
      const index = this.documents.indexOf(oldValue);
      this.documents.splice(index, 1, newValue);
    },
    deleteDocument(id: number) {
      this.documents = this.documents.filter(x => x.id !== id);
    }
  }
})
