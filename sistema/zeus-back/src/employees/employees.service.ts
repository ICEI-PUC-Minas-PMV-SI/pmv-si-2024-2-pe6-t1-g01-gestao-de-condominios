import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserRole } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class EmployeesService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  findAll() {
    return this.repo.find({ where: { role: UserRole.PORTEIRO } });
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
    return this.repo.find({ where: { email, role: UserRole.PORTEIRO } });
  }

  async findOne(id: number) {
    const employee = await this.repo.findOne({
      where: { id, role: UserRole.PORTEIRO },
    });

    if (!employee) {
      throw new NotFoundException('Employee not found');
    }

    return employee;
  }

  async update(id: number, body: UpdateEmployeeDto) {
    const employee = await this.findOne(id);

    if (!employee) {
      throw new NotFoundException('Porteiro not found');
    }

    if (employee.role !== 'PORTEIRO') {
      throw new BadRequestException(
        'O usuário deve ser do tipo PORTEIRO para ser atualizado.',
      );
    }

    Object.assign(employee, body);
    return this.repo.save(employee);
  }

  async remove(id: number) {
    const employee = await this.findOne(id);
    if (!employee) {
      throw new NotFoundException('Porteiro not found');
    }
    return this.repo.remove(employee);
  }
}
