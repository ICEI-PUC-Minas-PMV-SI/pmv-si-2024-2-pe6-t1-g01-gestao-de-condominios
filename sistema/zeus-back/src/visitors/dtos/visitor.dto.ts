import { Expose, Type } from 'class-transformer';
import { VisitDto } from 'src/visits/dtos/visit.dto';

export class VisitorDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  cellphone: string;

  @Expose()
  cpf: string;

  @Expose()
  @Type(() => VisitDto)
  visits: VisitDto[];

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
