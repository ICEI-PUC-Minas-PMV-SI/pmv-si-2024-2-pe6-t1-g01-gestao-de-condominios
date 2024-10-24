import type ResidentDto from './residentDto';
import type ResidentForm from './residentForm';

export default interface ResidentState {
  residents: ResidentDto[],
  resident: ResidentForm
}