import { IsString, IsOptional } from 'class-validator';

export class UpdateDocumentDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  link: string;
}
