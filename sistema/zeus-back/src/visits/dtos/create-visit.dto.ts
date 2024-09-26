import { IsString } from 'class-validator';

export class CreateVisitDto {
  @IsString()
  name: string;

  @IsString()
  cellphone: string;

  @IsString()
  cpf: string;
}
