import { Expose, Type } from 'class-transformer';
import { ApartmentDto } from 'src/apartments/dtos/apartment.dto';
import { Apartment } from 'src/entities/apartment.entity';

export class ResidentDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  cellphone: string;

  @Expose()
  cpf: string;

  @Expose()
  role: string;

  @Expose()
  apartmentId: number;

  @Expose()
  @Type(() => ApartmentDto)
  apartment: ApartmentDto;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
