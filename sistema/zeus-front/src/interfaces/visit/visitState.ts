import type VisitDto from './visitDto'
import type VisitForm from './visitForm'

export default interface VisitState {
  visits: VisitDto[],
  visit: VisitForm
}