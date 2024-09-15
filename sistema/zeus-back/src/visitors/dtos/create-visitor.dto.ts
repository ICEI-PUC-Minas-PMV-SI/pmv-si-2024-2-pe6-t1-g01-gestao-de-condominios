import { IsString } from 'class-validator';

export class CreateVisitorDto {
  @IsString()
  name: string;

  @IsString()
  cellphone: string;

  @IsString()
  cpf: string;
}
