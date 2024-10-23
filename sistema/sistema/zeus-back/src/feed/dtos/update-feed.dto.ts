import { IsString, IsOptional } from 'class-validator';

export class UpdateFeedDto {
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  description: string;
}