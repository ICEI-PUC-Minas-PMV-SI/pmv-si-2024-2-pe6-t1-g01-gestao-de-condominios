import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Apartment } from '../entities/apartment.entity';

@Injectable()
export class ApartmentsService {
  constructor(
    @InjectRepository(Apartment) private repo: Repository<Apartment>,
  ) {}

  create(number: number, block?: string) {
    const apartment = this.repo.create({
      number,
      block: block ?? null,
    });

    return this.repo.save(apartment);
  }

  async findAll() {
    return this.repo.find({ relations: ['residents'] });
  }

  async findOne(id: number) {
    const apartment = await this.repo.findOne({
      where: { id },
      relations: ['residents']
    });

    if (!apartment) {
      throw new NotFoundException('Apartamento não encontrado.');
    }

    return apartment;
  }

  findByNumber(number: number) {
    return this.repo.find({ where: { number } });
  }

  async update(id: number, attrs: Partial<Apartment>) {
    const apartment = await this.findOne(id);

    Object.assign(apartment, attrs);
    return this.repo.save(apartment);
  }

  async remove(id: number) {
    const apartment = await this.findOne(id);

    return this.repo.remove(apartment);
  }
}
