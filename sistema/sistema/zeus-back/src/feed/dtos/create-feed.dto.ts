import { IsString, IsOptional } from 'class-validator';

export class CreateFeedDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description: string;
}
