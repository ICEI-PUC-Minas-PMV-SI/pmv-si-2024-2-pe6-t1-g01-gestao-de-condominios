import { IsString, IsOptional } from 'class-validator';

export class UpdateVisitorsDto {
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
