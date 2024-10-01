import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Visit } from 'src/entities/visit.entity';
import { Repository } from 'typeorm';
import { UpdateVisitDto } from './dtos/update-visit.dto';
import { CreateVisitDto } from './dtos/create-visit.dto';
import { ResidentsService } from 'src/residents/residents.service';
import { VisitorsService } from 'src/visitors/visitors.service';

@Injectable()
export class VisitsService {
  constructor(
    @InjectRepository(Visit) private repo: Repository<Visit>,
    private residentsService: ResidentsService,
    private visitorsService: VisitorsService
  ) {}

  async create(body: CreateVisitDto) {
    const resident = await this.residentsService.findOne(body.userId);
    if (!resident) {
      throw new NotFoundException('Resident not found');
    }

    const visitor = await this.visitorsService.findOne(body.visitorId);
    if (!visitor) {
      throw new NotFoundException('Visitor not found');
    }

    const visit = this.repo.create({
      ...body,
      resident,
      visitor,
    });

    return this.repo.save(visit);
  }

  findAll() {
    return this.repo.find({ relations: ['visitor', 'resident'] });
  }

  async findOne(id: number) {
    if (!id) {
      throw new BadRequestException('id is required and must be bigger than zero.');
    }

    const visit = await this.repo.findOne({
      where: { id },
      relations: ['visitor', 'resident']
    });

    if (!visit) {
      throw new NotFoundException('Visit not found');
    }

    return visit;
  }

  async update(id: number, body: UpdateVisitDto) {
    const visit = await this.findOne(id);
    const resident = await this.residentsService.findOne(body.userId);
    const visitor = await this.visitorsService.findOne(body.visitorId);

    if (!visitor) {
      throw new NotFoundException('Visitor not found');
    }

    visit.status = body.status || visit.status;
    visit.visitedAt = body.visitedAt || visit.visitedAt;
    visit.resident = resident;
    visit.visitor = visitor;

    return this.repo.save(visit);
  }

  async remove(id: number) {
    const visit = await this.findOne(id);
    return this.repo.remove(visit);
  }
}
