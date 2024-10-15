import type VisitorsDto from './visitorsDto';
import type VisitorsForm from './visitorsForm';

export default interface VisitorsState {
  visitors: VisitorsDto[],
  visitor: VisitorsForm
}