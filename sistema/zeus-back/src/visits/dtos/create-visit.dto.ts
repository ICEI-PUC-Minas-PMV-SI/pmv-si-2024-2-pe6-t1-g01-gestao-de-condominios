import { IsDate, IsNumber, IsOptional } from 'class-validator';
import { IsVisitStatus } from '../decorators/is-visit-status.decorator';
import { VisitStatus } from 'src/entities/visit.entity';
import { Type } from 'class-transformer';

export class CreateVisitDto {
  @IsNumber()
  visitorId: number;

  @IsNumber()
  userId: number;

  @IsVisitStatus({ message: 'O status de visita deve ser "PENDENTE", "APROVADO" ou "DESAPROVADO".' })
  status: VisitStatus;

  @IsOptional()
  @IsDate({ message: 'O campo visitedAt deve ser uma data válida.' })
  @Type(() => Date)
  visitedAt?: Date;
}
