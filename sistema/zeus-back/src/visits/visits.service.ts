import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Visit } from 'src/entities/visit.entity';
import { Repository } from 'typeorm';
import { UpdateVisitDto } from './dtos/update-visit.dto';

@Injectable()
export class VisitsService {
  constructor(@InjectRepository(Visit) private repo: Repository<Visit>) {}

  create(name: string, cellphone: string, cpf: string) {
    const visit = this.repo.create({ name, cellphone, cpf });
    return this.repo.save(visit);
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    if (!id) {
      return null;
    }
    return this.repo.findOne({ where: { id } });
  }

  async update(id: number, body: UpdateVisitDto) {
    const visit = await this.findOne(id);
    if (!visit) {
      throw new NotFoundException('visit not found');
    }
    Object.assign(visit, body);
    return this.repo.save(visit);
  }

  async remove(id: number) {
    const visit = await this.findOne(id);
    if (!visit) {
      throw new NotFoundException('visit not found');
    }
    return this.repo.remove(visit);
  }
}
