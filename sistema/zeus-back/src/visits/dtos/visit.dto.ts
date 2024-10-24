import { Expose, Type } from 'class-transformer';
import { ResidentDto } from 'src/residents/dtos/resident.dto';
import { VisitorDto } from 'src/visitors/dtos/visitor.dto';

export class VisitDto {
  @Expose()
  id: number;

  @Expose()
  @Type(() => VisitorDto)
  visitor: VisitorDto;

  @Expose()
  @Type(() => ResidentDto)
  resident: ResidentDto;

  @Expose()
  status: string;

  @Expose()
  visitedAt: Date;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}