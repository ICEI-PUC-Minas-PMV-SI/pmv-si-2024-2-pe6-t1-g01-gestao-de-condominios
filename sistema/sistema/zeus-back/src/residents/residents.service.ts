import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateResidentDto } from './dtos/update-resident.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserRole } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { ApartmentsService } from 'src/apartments/apartments.service';
import { Apartment } from 'src/entities/apartment.entity';
import { CreateResidentDto } from './dtos/create-resident.dto';

const scrypt = promisify(_scrypt);

@Injectable()
export class ResidentsService {
  constructor(
    @InjectRepository(User) private repo: Repository<User>,
    private readonly apartmentsService: ApartmentsService
  ) {}

  findAll() {
    return this.repo.find({
      where: { role: UserRole.MORADOR },
      relations: ['apartment', 'visits']
    });
  }

  async findOne(id: number) {
    const resident = await this.repo.findOne({
      where: { id, role: UserRole.MORADOR },
      relations: ['apartment', 'visits'],
    });

    if (!resident) {
      throw new NotFoundException('Morador not found');
    }

    return resident;
  }

  async create(body: CreateResidentDto) {
    const users = await this.findByEmail(body.email);
    if (users.length) {
      throw new BadRequestException('email in use');
    }

    if (!body.role) {
      throw new BadRequestException('role is required');
    }

    if (!(body.role in UserRole)) {
      throw new BadRequestException('role is invalid');
    }

    let apartment: Apartment | null = null;
    if (body.apartmentId) {
      apartment = await this.apartmentsService.findOne(body.apartmentId);
    }

    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(body.password, salt, 32)) as Buffer;
    const result = salt + '.' + hash.toString('hex');
    body.password = result;

    const user = this.repo.create({ ...body, apartment });
    return this.repo.save(user);
  }

  findByEmail(email: string) {
    return this.repo.find({ where: { email, role: UserRole.MORADOR } });
  }

  async update(id: number, body: UpdateResidentDto) {
    const resident = await this.findOne(id);

    if (resident.role !== 'MORADOR') {
      throw new BadRequestException(
        'O usuário deve ser do tipo MORADOR para ser atualizado.',
      );
    }

    let apartment: Apartment | null = null;
    if (body.apartmentId) {
      apartment = await this.apartmentsService.findOne(body.apartmentId);
    }

    Object.assign(resident, body);
    return this.repo.save({ ...resident, apartment});
  }

  async remove(id: number) {
    const resident = await this.findOne(id);
    return this.repo.remove(resident);
  }
}
