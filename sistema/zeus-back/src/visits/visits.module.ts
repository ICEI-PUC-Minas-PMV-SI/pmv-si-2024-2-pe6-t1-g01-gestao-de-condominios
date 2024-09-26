import { Module } from '@nestjs/common';
import { VisitsService } from './visits.service';
import { VisitsController } from './visits.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Visit } from 'src/entities/visit.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Visit])],
  providers: [VisitsService],
  controllers: [VisitsController]
})
export class VisitsModule {}
