import { Module } from '@nestjs/common';
import { VisitsService } from './visits.service';
import { VisitsController } from './visits.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Visit } from 'src/entities/visit.entity';
import { VisitorsModule } from 'src/visitors/visitors.module';
import { ResidentsModule } from 'src/residents/residents.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Visit]),
    ResidentsModule,
    VisitorsModule,
  ],
  providers: [VisitsService],
  controllers: [VisitsController]
})
export class VisitsModule {}
