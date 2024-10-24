import type VisitorDto from './visitorDto';
import type VisitorsForm from './visitorsForm';

export default interface VisitorsState {
  visitors: VisitorDto[],
  visitor: VisitorsForm
}