import { Expose } from 'class-transformer';

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
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
