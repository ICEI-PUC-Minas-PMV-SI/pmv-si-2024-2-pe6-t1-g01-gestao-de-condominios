import { IsString, IsOptional } from 'class-validator';

export class UpdateVisitorDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  cellphone: string;

  @IsString()
  @IsOptional()
  cpf: string;
}
