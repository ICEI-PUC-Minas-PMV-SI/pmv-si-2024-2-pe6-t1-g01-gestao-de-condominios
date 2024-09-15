import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateResidentDto } from './dto/update-resident.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserRole } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { CreateEmployeeDto } from 'src/employees/dto/create-employee.dto';

const scrypt = promisify(_scrypt);

@Injectable()
export class ResidentsService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  findAll() {
    return this.repo.find({ where: { role: UserRole.MORADOR } });
  }

  async findOne(id: number) {
    const resident = await this.repo.findOne({
      where: { id, role: UserRole.MORADOR },
      relations: ['apartment'],
    });

    if (!resident) {
      throw new NotFoundException('Morador not found');
    }

    return resident;
  }

  async create(body: CreateEmployeeDto) {
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

    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(body.password, salt, 32)) as Buffer;
    const result = salt + '.' + hash.toString('hex');
    body.password = result;

    const user = this.repo.create(body);

    return this.repo.save(user);
  }

  findByEmail(email: string) {
    return this.repo.find({ where: { email, role: UserRole.MORADOR } });
  }

  async update(id: number, body: UpdateResidentDto) {
    const resident = await this.findOne(id);

    if (!resident) {
      throw new NotFoundException('Morador not found');
    }

    if (resident.role !== 'MORADOR') {
      throw new BadRequestException(
        'O usuário deve ser do tipo MORADOR para ser atualizado.',
      );
    }

    Object.assign(resident, body);
    return this.repo.save(resident);
  }

  async remove(id: number) {
    const resident = await this.findOne(id);
    if (!resident) {
      throw new NotFoundException('Morador not found');
    }
    return this.repo.remove(resident);
  }
}
