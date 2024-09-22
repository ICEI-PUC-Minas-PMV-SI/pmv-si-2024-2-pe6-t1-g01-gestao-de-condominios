import { IsString, IsOptional } from 'class-validator';

export class CreateDocumentDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description: string;
}
