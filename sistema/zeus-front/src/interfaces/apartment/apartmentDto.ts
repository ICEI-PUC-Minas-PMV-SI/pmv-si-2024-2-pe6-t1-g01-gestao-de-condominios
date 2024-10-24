import type ResidentRelationship from '../resident/residentRelationship';

export default interface ApartmentDto {
  id: number,
  number: number,
  block: string | null,
  residents: ResidentRelationship[],
  createdAt: Date,
  updatedAt: Date
}