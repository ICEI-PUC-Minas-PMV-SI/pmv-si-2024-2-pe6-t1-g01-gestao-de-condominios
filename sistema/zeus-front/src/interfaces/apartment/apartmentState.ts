import type ApartmentDto from './apartmentDto';
import type ApartmentForm from './apartmentForm';

export default interface ApartmentState {
  apartments: ApartmentDto[],
  apartment: ApartmentForm
}