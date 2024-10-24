import type DocumentDto from './documentDto';
import type DocumentPayload from './documentPayload';

export default interface DocumentState {
  document: DocumentPayload,
  documents: DocumentDto[]
}